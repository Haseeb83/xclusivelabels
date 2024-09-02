import { LabelManager } from "@lib/label";
import { log } from "@utils/log";
import { getSettings } from "@utils/settings";
import PDFMerger from "pdf-merger-js";

type QueueProps = { pdfs: PDFInsertModel[]; batch_uuid: string };

export const pdfDownloadBatchQueue = async (batch: MessageBatch<QueueProps>, env: Bindings) => {
	for (const item of batch.messages) {
		try {
			const settings = await getSettings(env.DB);

			const merger = new PDFMerger();
			const manager = new LabelManager(env, settings);

			const labels_uuid: string[] = [];

			for (const pdf of item.body.pdfs) {
				var buffer: ArrayBuffer;

				if (pdf.pdf === "") continue;
				if (pdf.pdf === null) continue;
				if (pdf.pdf === undefined) continue;

				if (pdf.type === "usps") {
					buffer = await manager.downloadUSPSLabel(pdf.pdf);
				} else {
					buffer = await manager.downloadUPSLabel(pdf.pdf);
				}

				try {
					await merger.add(buffer, "0,1");
				} catch (error) {
					await merger.add(buffer);
				}

				labels_uuid.push(pdf.uuid);
			}

			await manager.downloadMergePdf(`${item.body.batch_uuid}.pdf`, merger);

			await manager.updateLabelBatchStatus(item.body.batch_uuid);
			await manager.updateLabelDownloadStatusFromDrizzleBatch(labels_uuid);
			await manager.notifyBatchDownloadCompleteEvent(item.body.batch_uuid);
		} catch (err) {
			log(`pdf download queue error: ${(err as Error).message}`);
		}

		item.ack();
	}
};
