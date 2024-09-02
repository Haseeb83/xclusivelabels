import { LabelManager } from "@lib/label";
import { Model } from "@lib/model";
import { crons } from "@schemas/crons";
import { labels } from "@schemas/labels";
import { Id } from "@shipaxxess/shipaxxess-zod-v4";
import { exception } from "@utils/error";
import { getSettings } from "@utils/settings";
import { eq } from "drizzle-orm";
import { Context } from "hono";
import PDFMerger from "pdf-merger-js";

const GetAll = async (c: Context<App>) => {
	const model = new Model(c.env.DB);

	const cr = await model.all(crons);

	return c.json(cr);
};

const Remove = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Id.ZODSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	const [cron] = await model.delete(crons, eq(crons.id, parse.id));

	await model.update(
		labels,
		{
			status_label: "cancelled",
			status_message: "admin removed from cron",
		},
		eq(labels.uuid, cron.label_uuid),
	);

	return c.json({ success: true });
};

const Reprocess = async (c: Context<App, "/:id">) => {
	const body = await c.req.json();
	const parse = Id.ZODSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	const cron_data = await model.get(crons, eq(crons.id, parse.id));
	if (!cron_data) throw exception({ message: "Cron not found", code: 404 });

	const label = await model.get(labels, eq(labels.uuid, cron_data.label_uuid));
	if (!label) throw exception({ message: "Label not found", code: 404 });

	const settings = await getSettings(c.env.DB);

	const manager = new LabelManager(c.env, settings);

	if (label.type === "usps") {
		const payload = await manager.generateUSPSLabel(label);

		if (!payload.payload.code || !payload.payload.id || !payload.payload.pdf) {
			throw exception({ message: payload.message, code: 400 });
		}

		await manager.updateUSPSLabelStatus({ payload, id: label.id });

		const buffer = await manager.downloadUSPSLabel(payload.payload.pdf.split("/")[4]);
		const r2 = await c.env.LABELS_BUCKET.get(`${label.batch_uuid}.pdf`);
		if (!r2) throw exception({ message: "Batch label not found", code: 404 });
		const batchBuffer = await r2.arrayBuffer();
		if (!batchBuffer) throw exception({ message: "Batch label not found", code: 404 });

		const merger = new PDFMerger();

		await merger.add(batchBuffer);
		await merger.add(buffer);

		const mergedPdf = await merger.saveAsBuffer();

		await c.env.LABELS_BUCKET.put(`${label.batch_uuid}.pdf`, mergedPdf);
	} else {
		const payload = await manager.generateUPSLabel(label);

		if (!payload.payload.tracking || !payload.payload.id || !payload.payload.pdf) {
			throw exception({ message: payload.message, code: 400 });
		}

		await manager.updateUPSLabelStatus({ payload, id: label.id });

		const buffer = await manager.downloadUPSLabel(payload.payload.pdf.split("/")[5]);
		const r2 = await c.env.LABELS_BUCKET.get(`${label.batch_uuid}.pdf`);
		if (!r2) throw exception({ message: "Batch label not found", code: 404 });
		const batchBuffer = await r2.arrayBuffer();
		if (!batchBuffer) throw exception({ message: "Batch label not found", code: 404 });

		const merger = new PDFMerger();

		await merger.add(batchBuffer);
		await merger.add(buffer);

		const mergedPdf = await merger.saveAsBuffer();

		await c.env.LABELS_BUCKET.put(`${label.batch_uuid}.pdf`, mergedPdf);
	}

	return c.json({ success: true });
};

export const CronsAdmin = { GetAll, Remove, Reprocess };
