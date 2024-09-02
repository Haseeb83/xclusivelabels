import { batchLabelQueue } from "@api/queue/labels";
import { pdfDownloadBatchQueue } from "@api/queue/pdf";

export const queue = (batch: MessageBatch<any>, env: Bindings) => {
	switch (batch.queue) {
		case "batch-labels": {
			return batchLabelQueue(batch, env);
		}

		case "batch-pdf-downloads": {
			return pdfDownloadBatchQueue(batch, env);
		}

		default: {
			return;
		}
	}
};
