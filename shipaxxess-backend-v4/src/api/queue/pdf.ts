import { LabelManager } from "@lib/label";
import { log } from "@utils/log";
import { getSettings } from "@utils/settings";
import PDFMerger from "pdf-merger-js";

type QueueProps = { pdfs: PDFInsertModel[]; batch_uuid: string };
export const pdfDownloadBatchQueue = async (batch: MessageBatch<QueueProps>, env: Bindings) => {
	console.log(batch.messages);
	for (const item of batch.messages) {
		try {
			const settings = await getSettings(env.DB);
			const merger = new PDFMerger();
			const manager = new LabelManager(env, settings);
			const labels_uuid: string[] = [];
			console.log(item.body.pdfs, "///////////////");
			for (const pdf of item.body.pdfs) {
				if (!pdf.pdf) continue; // Handles empty, null, or undefined

				let buffer: ArrayBuffer;
				if (pdf.type === "usps") {
					buffer = await manager.downloadUSPSLabel(pdf.pdf);
				} else if (pdf.type === "ups") {
					buffer = await manager.downloadUPSLabel(pdf.pdf);
				} else {
					buffer = await manager.downloadFedexLabel(pdf.pdf);
				}

				try {
					await merger.add(buffer, "0,1");
				} catch (error) {
					await merger.add(buffer);
				}

				labels_uuid.push(pdf.uuid);
			}

			// Debugging the SQL statements generated
			await manager.downloadMergePdf(`${item.body.batch_uuid}.pdf`, merger);
			console.log(`Merging PDFs for batch: ${item.body.batch_uuid}`);

			await manager.updateLabelBatchStatus(item.body.batch_uuid);
			console.log(`Updated label batch status for batch: ${item.body.batch_uuid}`);

			console.log(`Updated label download status for labels: ${labels_uuid}`);
			await manager.updateLabelDownloadStatusFromDrizzleBatch(labels_uuid);

			await manager.notifyBatchDownloadCompleteEvent(item.body.batch_uuid);
			console.log(`Notified download complete for batch: ${item.body.batch_uuid}`);
		} catch (err) {
			log(`pdf download queue error: ${(err as Error).message}`);
		}

		item.ack();
	}
};