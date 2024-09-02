import { LabelManager } from "@lib/label";
import { Model } from "@lib/model";
import { addresses } from "@schemas/addresses";
import { batchs } from "@schemas/batchs";
import { labels } from "@schemas/labels";
import { refunds } from "@schemas/refunds";
import { subscriptions } from "@schemas/subscriptions";
import { users } from "@schemas/users";
import { Id, Labels, Refund } from "@shipaxxess/shipaxxess-zod-v4";
import { exception } from "@utils/error";
import { log } from "@utils/log";
import { sendPushNotification } from "@utils/push";
import { getSettings } from "@utils/settings";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { v4 } from "uuid";

const GetAll = async (c: Context<App>) => {
	const model = new Model(c.env.DB);

	const batches = await model.all(batchs, eq(batchs.user_id, c.get("jwtPayload").id));

	return c.json(batches);
};

const Get = async (c: Context<App, "/:uuid">) => {
	const batch_uuid = c.req.param("uuid");

	const model = new Model(c.env.DB);

	const batch = await model.get(batchs, eq(batchs.uuid, batch_uuid));
	if (!batch) {
		throw exception({ message: "Batch not found.", code: 404 });
	}

	const batchLabels = await model.all(labels, eq(labels.batch_uuid, batch_uuid));

	return c.json({ labels: batchLabels, batch: { name: batch.name, status_refund: batch.status_refund } });
};

const Create = async (c: Context<App>) => {
	log("Hit label batch endpoint.");
	console.log("CENV", c);

	const body = await c.req.json();
	const parse = Labels.BATCHZODSCHEMA.parse(body);
	log("Parsed body.");

	const settings = await getSettings(c.env.DB);


	const manager = new LabelManager(c.env, settings);
	log("Created label manager.");

	if (!manager.haveGrithOk(parse.package.height, parse.package.width, parse.package.length, parse.type.type)) {
		throw exception({ message: "Package dimensions are too large.", code: 508 });
	}
	log("Package dimensions are ok.");

	const weight = await manager.getWeightData(parse.type.type, parse.type.id, parse.package.weight);
	if (!weight) {
		throw exception({ message: "Weight not found.", code: 404 });
	}
	log("Weight is ok.");

	const total_labels = parse.recipient.length;
	const user_cost = weight.user_cost * total_labels;
	const reseller_cost = weight.reseller_cost * total_labels;

	const user = await manager.getUserData(c.get("jwtPayload").id);
	if (!user) {
		throw exception({ message: "User not found.", code: 404 });
	}
	log("User is ok.");

	if (user.current_balance < user_cost) {
		throw exception({ message: "Insufficient funds.", code: 402 });
	}
	log("User has enough funds.");

	const batch = await manager.saveIntoBatchTable(parse, user_cost, reseller_cost, user.id);
	log("Batch saved.");

	c.executionCtx.waitUntil(manager.chargeUserForBatch(user, user_cost, total_labels));
	c.executionCtx.waitUntil(manager.sendToBatchProcessQueue(batch.id));

	log("User charged and batch sent to queue.");

	const savedSender = async () => {
		const model = new Model(c.env.DB);


		return await model.insert(addresses, {
			uuid: v4(),
			user_id: user.id,
			full_name: parse.sender.full_name,
			company_name: parse.sender.company_name,
			city: parse.sender.city,
			zip: parse.sender.zip,
			state: parse.sender.state,
			street_one: parse.sender.street_one,
			street_two: parse.sender.street_two,
			country: parse.sender.country,
		});
	};
	log("Saved sender.");
	if (parse.saved_sender) {
		log("Waiting for saved sender.");
		c.executionCtx.waitUntil(savedSender());
	}
	const message = {

	}
	const devicetoken = await drizzle(c.env.DB).select().from(subscriptions).where(and(eq(subscriptions.user_id, user.id), eq(subscriptions.is_active, true))).all()
	console.log("devicetoken", devicetoken)
	if (devicetoken.length > 0) {
		devicetoken.map(async (token: any) => {
			const message = {
				to: token.token,
				title: "New Label",
				body: `Your label has been created successfully`
			}
			await sendPushNotification(token.token, message)
		})

	}

	return c.json({ success: true, message: "We are processing your batch. Please check back later." });
};

const RefundAsBatch = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Refund.ZODSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	const batch = await model.get(batchs, eq(batchs.uuid, parse.batch_uuid));
	if (!batch) {
		throw exception({ message: "Batch not found.", code: 404 });
	}

	const user = await model.get(users, eq(users.id, c.get("jwtPayload").id));
	if (!user) {
		throw exception({ message: "User not found.", code: 404 });
	}

	await model.insert(refunds, {
		email_address: user.email_address,
		first_name: user.first_name,
		last_name: user.last_name,
		user_id: c.get("jwtPayload").id,
		uuid: v4(),
		batch_uuid: batch.uuid,
		waiting_for: 3,
	});

	await model.update(batchs, { status_label: "pending_refund", status_refund: true }, eq(batchs.uuid, batch.uuid));

	return c.json({ success: true, message: "We are processing your refund. might take 3-4 days to get the refund" });
};

const RefundAsSingle = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Refund.IDUUIDSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	const label = await model.get(labels, eq(labels.uuid, parse.id));
	if (!label) {
		throw exception({ message: "Label not found.", code: 404 });
	}

	if (!label.batch_uuid) {
		throw exception({ message: "Label not found.", code: 404 });
	}

	const batch = await model.get(batchs, eq(batchs.uuid, label.batch_uuid));
	if (!batch) {
		throw exception({ message: "Batch not found.", code: 404 });
	}

	const user = await model.get(users, eq(users.id, c.get("jwtPayload").id));
	if (!user) {
		throw exception({ message: "User not found.", code: 404 });
	}

	await model.insert(refunds, {
		email_address: user.email_address,
		first_name: user.first_name,
		last_name: user.last_name,
		user_id: c.get("jwtPayload").id,
		uuid: v4(),
		label_uuid: label.uuid,
		waiting_for: 3,
	});

	await model.update(labels, { status_refund: true, status_label: "refunded" }, eq(labels.id, label.id));

	await model.update(
		batchs,
		{
			cost_user: batch.cost_user - label.cost_user,
			cost_reseller: batch.cost_reseller - label.cost_reseller,
			total_labels: batch.total_labels - 1,
		},
		eq(batchs.id, batch.id),
	);

	return c.json({ success: true, message: "We are processing your refund. might take 3-4 days to get the refund" });
};

const DownloadSingle = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Id.ZODSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	const label = await model.get(labels, eq(labels.id, parse.id));
	if (!label) {
		throw exception({ message: "Label not found.", code: 404 });
	}
	if (!label.remote_pdf_r2_link) {
		throw exception({ message: "Label not ready to download.", code: 404 });
	}

	const r2data = await c.env.LABELS_BUCKET.get(label.remote_pdf_r2_link);
	if (!r2data) {
		throw exception({ message: "pdf not found.", code: 404 });
	}

	return new Response(r2data.body, {
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": `attachment; filename="${label.remote_pdf_r2_link}"`,
		},
	});
};

const DownloadBatch = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Id.UUIDSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	const batch = await model.get(batchs, eq(batchs.uuid, parse.uuid));
	if (!batch) {
		throw exception({ message: "Batch not found.", code: 404 });
	}

	if (!batch.merge_pdf_key) {
		throw exception({ message: "Batch not ready to download.", code: 404 });
	}

	const r2data = await c.env.LABELS_BUCKET.get(batch.merge_pdf_key);
	if (!r2data) {
		throw exception({ message: "pdf not found.", code: 404 });
	}

	return new Response(r2data.body, {
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": `attachment; filename="${batch.merge_pdf_key}"`,
		},
	});
};

const Search = async (c: Context<App>) => {
	const body = await c.req.json();
	const { search_type, delivery_id, end_date, from_date, name, status, uuid, weight, weight_unit_query } =
		Labels.SEARCHZODSCHEMA.parse(body);

	// Label search
	if (search_type === "label") {
		if (uuid) {
			const data = await drizzle(c.env.DB).select().from(labels).where(eq(labels.uuid, uuid)).all();
			return c.json(data);
		}
	}

	if (search_type === "batch" && uuid) {
		const data = await drizzle(c.env.DB).select().from(batchs).where(eq(batchs.uuid, uuid)).all();
		return c.json(data);
	}

	if (search_type === "label" && name) {
	}

	return c.json({});
};

export const LabelsUser = { GetAll, Create, RefundAsBatch, Get, DownloadSingle, DownloadBatch, Search, RefundAsSingle };
