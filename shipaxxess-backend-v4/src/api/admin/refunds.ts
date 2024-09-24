import { Model } from "@lib/model";
import { batchs } from "@schemas/batchs";
import { labels } from "@schemas/labels";
import { payments } from "@schemas/payments";
import { refunds } from "@schemas/refunds";
import { users } from "@schemas/users";
import { exception } from "@utils/error";
import { log } from "@utils/log";
import { getSettings } from "@utils/settings";
import { eq } from "drizzle-orm";
import { Context } from "hono";
import { v4 } from "uuid";

const GetAll = async (c: Context<App>) => {
	const model = new Model(c.env.DB);

	const rt = await model.all(refunds);

	return c.json(rt);
};

const Refund = async (c: Context<App, "/:uuid">) => {
	const model = new Model(c.env.DB);

	const batch = await model.get(batchs, eq(batchs.uuid, c.req.param("uuid")));
	if (!batch) {
		throw exception({ message: "Batch not found", code: 404 });
	}

	const user = await model.get(users, eq(users.id, batch.user_id));
	if (!user) {
		throw exception({ message: "User not found", code: 404 });
	}

	await model.update(
		users,
		{
			current_balance: user.current_balance + batch.cost_user,
			total_labels: user.total_labels - batch.total_labels,
			total_spent: user.total_spent - batch.cost_user,
			total_refund: user.total_refund + batch.cost_user,
		},
		eq(users.id, user.id),
	);

	await model.insert(payments, {
		credit: batch.cost_user,
		user_id: user.id,
		status: "confirmed",
		current_balance: user.current_balance,
		gateway: "Refund",
		new_balance: user.current_balance + batch.cost_user,
		user_email: user.email_address,
		user_name: user.first_name + " " + user.last_name,
		uuid: v4(),
		data_id: batch.id,
	});

	await model.update(refunds, { is_refunded: true }, eq(refunds.batch_uuid, batch.uuid));

	await model.update(batchs, { status_label: "refunded" }, eq(batchs.uuid, batch.uuid));

	return c.json({ success: true, message: "Refunded successfully" });
};

const LabelRefund = async (c: Context<App, "/:uuid">) => {
	const model = new Model(c.env.DB);

	const label = await model.get(labels, eq(labels.uuid, c.req.param("uuid")));
	if (!label) {
		throw exception({ message: "Label not found", code: 404 });
	}

	const user = await model.get(users, eq(users.id, label.user_id));
	if (!user) {
		throw exception({ message: "User not found", code: 404 });
	}

	await model.update(
		users,
		{
			current_balance: user.current_balance + label.cost_user,
			total_labels: user.total_labels - 1,
			total_spent: user.total_spent - label.cost_user,
			total_refund: user.total_refund + label.cost_user,
		},
		eq(users.id, user.id),
	);

	await model.insert(payments, {
		credit: label.cost_user,
		user_id: user.id,
		status: "confirmed",
		current_balance: user.current_balance,
		gateway: "Refund",
		new_balance: user.current_balance + label.cost_user,
		user_email: user.email_address,
		user_name: user.first_name + " " + user.last_name,
		uuid: v4(),
		data_id: label.id,
	});

	await model.update(labels, { status_label: "refunded", status_refund: true }, eq(labels.id, label.id));

	await model.update(refunds, { is_refunded: true }, eq(refunds.label_uuid, label.uuid));

	return c.json({ success: true, message: "Refunded successfully" });
};

const Recycle = async (c: Context<App, "/:uuid">) => {
	const model = new Model(c.env.DB);

	const settings = await getSettings(c.env.DB);

	const batch = await model.get(batchs, eq(batchs.uuid, c.req.param("uuid")));
	if (!batch) {
		throw exception({ message: "Batch not found", code: 404 });
	}

	for (const recipient of batch.recipients) {
		const label = await model.get(labels, eq(labels.uuid, recipient.uuid));
		if (!label) {
			log("Label not found");
			continue;
		}

		if (label.status_refund) {
			log("Label already refunded");
			continue;
		}

		if (!label.remote_id) {
			log("Label not synced");
			continue;
		}

		const req = await fetch(`${settings["label_host"]}/api/admin/ex-recycle-label`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": settings["label_apikey"],
			},
			body: JSON.stringify({ id: label.remote_id }),
		});

		if (!req.ok) {
			log("Error recycling label");
			continue;
		}

		await model.update(
			labels,
			{
				status_label: "refunded",
				status_refund: true,
			},
			eq(labels.id, label.id),
		);
	}

	await model.update(
		refunds,
		{
			is_recycled: true,
		},
		eq(refunds.batch_uuid, batch.uuid),
	);

	return c.json({ success: true, message: "Recycled successfully" });
};

const LabelRecycle = async (c: Context<App, "/:uuid">) => {
	const model = new Model(c.env.DB);

	const settings = await getSettings(c.env.DB);

	const label = await model.get(labels, eq(labels.uuid, c.req.param("uuid")));
	if (!label) {
		throw exception({ message: "Label not found", code: 404 });
	}

	const req = await fetch(`${settings["label_host"]}/api/admin/ex-recycle-label`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": settings["label_apikey"],
		},
		body: JSON.stringify({ id: label.remote_id }),
	});

	if (!req.ok) {
		throw exception({ message: "Error recycling label", code: 500 });
	}

	await model.update(
		labels,
		{
			status_label: "refunded",
			status_refund: true,
		},
		eq(labels.id, label.id),
	);

	await model.update(
		refunds,
		{
			is_recycled: true,
		},
		eq(refunds.label_uuid, label.uuid),
	);

	return c.json({ success: true, message: "Recycled successfully" });
};

export const RefundAdmin = { GetAll, Refund, Recycle, LabelRecycle, LabelRefund };
