import { Model } from "@lib/model";
import { batchs } from "@schemas/batchs";
import { labels } from "@schemas/labels";
import { Id } from "@shipaxxess/shipaxxess-zod-v4";
import { exception } from "@utils/error";
import { eq } from "drizzle-orm";
import { Context } from "hono";

const GetAll = async (c: Context<App>) => {
	const model = new Model(c.env.DB);

	const batches = await model.all(batchs);

	return c.json(batches);
};

const Get = async (c: Context<App, "/:uuid">) => {
	const batch_uuid = c.req.param("uuid");

	const model = new Model(c.env.DB);

	const batchLabels = await model.all(labels, eq(labels.batch_uuid, batch_uuid));

	return c.json(batchLabels);
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

export const LabelsAdmin = { GetAll, Get, DownloadSingle, DownloadBatch };
