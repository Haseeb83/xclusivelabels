import { LabelManager } from "@lib/label";
import { exception } from "@utils/error";
import { log } from "@utils/log";
import { getSettings } from "@utils/settings";

type MessageProps = { batch_id: number };

export const batchLabelQueue = async (batch: MessageBatch<MessageProps>, env: Bindings) => {
	for (const item of batch.messages) {
		try {
			const settings = await getSettings(env.DB);

			const manager = new LabelManager(env, settings);

			const batch = await manager.getBatchData(item.body.batch_id);
			if (!batch) throw exception({ message: "Batch not found.", code: 404 });

			const user = await manager.getUserData(batch.user_id);
			if (!user) throw exception({ message: "User not found.", code: 404 });

			if (batch.type === "usps") {
				for (const recipient of batch.recipients) {
					// @ts-ignore lazy to change the type from zod lol :)
					await manager.generateUSPSLabelFromBatch(batch, recipient, {
						reseller: batch.cost_reseller / batch.total_labels,
						user: batch.cost_user / batch.total_labels,
					});
				}
			} else if (batch.type === "ups") {
				for (const recipient of batch.recipients) {
					// @ts-ignore lazy to change the type from zod lol :)
					await manager.generateUPSLabelFromBatch(batch, recipient, {
						reseller: batch.cost_reseller / batch.total_labels,
						user: batch.cost_user / batch.total_labels,
					});
				}
			} else {
				for (const recipient of batch.recipients) {
					// @ts-ignore lazy to change the type from zod lol :)
					await manager.generateFedexLabelFromBatch(batch, recipient, {
						reseller: batch.cost_reseller / batch.total_labels,
						user: batch.cost_user / batch.total_labels,
					});
				}
			}

			await manager.sendToBatchDownloadQueue(batch.uuid);
			await manager.saveIntoLabelTableWithDrizzleBatch();
			await manager.saveIntoCronTable();

			if (batch.recipients.length === 1) {
				await manager.updateBatchFirstTrackingNumber(batch.uuid);
			}

			log("label queue");
		} catch (err) {
			log(`label queue error====================>: ${err}`);
			log(`label queue error: ${(err as Error).message}`);
		}

		item.ack();
	}
};