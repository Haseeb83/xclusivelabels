import { config } from "@config";
import { getWeight } from "@helpers/query";
import { BatchsSelectModel, batchs } from "@schemas/batchs";
import { crons } from "@schemas/crons";
import { LabelsInsertModel, LabelsSelectModel, labels } from "@schemas/labels";
import { payments } from "@schemas/payments";
import { UsersSelectModel, users } from "@schemas/users";
import { Address, Labels } from "@shipaxxess/shipaxxess-zod-v4";
import { exception } from "@utils/error";
import { girth } from "@utils/girth";
import { log } from "@utils/log";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import PDFMerger from "pdf-merger-js";
import { v4 } from "uuid";


const getValueFromServiceToken = (token: any) => {
	if (token === "usps_priority") return "priority";
	if (token === "usps_express") return "express";
	if (token === "usps_firstclass") return "firstclass";
	// add the possible values for future
};

export class LabelManager {
	private labels: LabelsInsertModel[] = [];
	private pdfs: PDFInsertModel[] = [];
	private crons: { uuid: string; message: string }[] = [];

	constructor(private env: Bindings, private settings: { [x: string]: string }) {
		if (!this.settings["label_apikey"]) {
			throw exception({ message: "label_apikey is not defined", code: 404 });
		}

		if (!this.settings["label_host"]) {
			throw exception({ message: "label_host is not defined", code: 404 });
		}

		log("Label manager is ready.");
	}

	haveGrithOk(height: number, length: number, width: number, type: "ups" | "usps" | "fedex") {
		const isGirthOk = girth([height, length, width]);

		if (type === "ups" && isGirthOk > config.packages.ups_max_girth) {
			return false;
		}

		if (type === "usps" && isGirthOk > config.packages.usps_max_girth) {
			return false;
		}

		return true;
	}

	async getUserData(user_id: number) {
		return await drizzle(this.env.DB).select().from(users).where(eq(users.id, user_id)).get();
	}

	async getWeightData(
		type: "usps" | "ups" | "fedex",
		type_id: number,
		weight: number,
		width: number,
		height: number,
		length: number,
	) {
		return await getWeight(this.env.DB, { type, type_id, weight, width, height, length });
	}

	async getBatchData(batch_id: number) {
		return await drizzle(this.env.DB).select().from(batchs).where(eq(batchs.id, batch_id)).get();
	}

	async saveIntoBatchTable(params: Labels.BATCHZODSCHEMA, user_cost: number, reseller_cost: number, user_id: number) {
		const [insert] = await drizzle(this.env.DB)
			.insert(batchs)
			// @ts-expect-error unkwon
			.values({
				package_height: params.package.height,
				package_length: params.package.length,
				package_weight: params.package.weight,
				package_width: params.package.width,
				package_id: params.package.id,
				package_name: params.package.name,
				recipients: params.recipient,
				sender_phone: params.sender.phone,
				sender_city: params.sender.city,
				sender_country: params.sender.country,
				sender_full_name: params.sender.full_name,
				sender_state: params.sender.state,
				sender_street_one: params.sender.street_one,
				sender_zip: params.sender.zip,
				sender_company_name: params.sender.company_name,
				sender_street_two: params.sender.street_two,
				type_label: params.type.label,
				type_unit: params.type.unit,
				type_value: params.type.value,
				shipping_date: params.shippingdate,
				type: params.type.type,
				user_id: user_id,
				uuid: params.batch_uuid,
				total_labels: params.recipient.length,
				saturday: params.saturday,
				signature: params.signature,
				cost_user: user_cost,
				cost_reseller: reseller_cost,
				name: params.name,
			})
			.returning({ id: batchs.id });

		log("Saved into batch table.");

		return insert;
	}

	async saveIntoCronTable() {
		if (this.crons.length === 0) {
			log("No crons to save.");
			return;
		}

		await drizzle(this.env.DB).batch(
			// @ts-expect-error type error
			this.crons.map((nod) =>
				drizzle(this.env.DB).insert(crons).values({ label_uuid: nod.uuid, meta_data: nod.message, uuid: v4() }),
			),
		);

		log("Saved into cron table.");
	}

	async saveIntoLabelTable() {}

	async saveIntoLabelTableWithDrizzleBatch() {
		await drizzle(this.env.DB).batch(
			// @ts-expect-error type error
			this.labels.map((label) => drizzle(this.env.DB).insert(labels).values(label)),
		);
		log("Saved into label table.");
	}

	async chargeUserForLabel() {}

	async chargeUserForBatch(user: UsersSelectModel, user_cost: number, total_labels: number) {
		await drizzle(this.env.DB)
			.update(users)
			.set({
				current_balance: user.current_balance - user_cost,
				total_labels: user.total_labels + total_labels,
				total_spent: user.total_spent + user_cost,
			})
			.where(eq(users.id, user.id))
			.execute();
		log("Charged user for batch.");

		await drizzle(this.env.DB)
			.insert(payments)
			.values({
				credit: user_cost,
				user_id: user.id,
				status: "confirmed",
				current_balance: user.current_balance,
				gateway: "Label",
				new_balance: user.current_balance - user_cost,
				user_email: user.email_address,
				user_name: user.first_name + " " + user.last_name,
				uuid: v4(),
			});
	}

	async sendToBatchProcessQueue(batch_id: number) {
		console.log("sendToBatchProcessQueue", batch_id);

		if (this.env.BATCH_QUEUE) {
			return await this.env.BATCH_QUEUE.send({ batch_id }, { contentType: "json" });
		} else {
			console.error("BATCH_QUEUE is not defined");
		}
	}

	async sendToBatchDownloadQueue(batch_uuid: string) {
		return await this.env.BATCH_PDF_QUEUE.send({ pdfs: this.pdfs, batch_uuid }, { contentType: "json" });
	}

	async generateUSPSLabel(label: LabelsSelectModel) {
		console.log("label", label);
		const req = await fetch(`${this.settings["label_host"]}/api/label/generate`, {
			method: "POST",
			headers: { "Content-Type": "application/json", "x-api-key": this.settings["label_apikey"] },
			body: JSON.stringify({
				type: getValueFromServiceToken(label.type_value),
				weight: label.package_weight,
				date: label.shipping_date,
				fromCountry: label.sender_country,
				fromName: label.sender_full_name,
				fromRefNumber: label.sender_company_name,
				fromStreetNumber: label.sender_street_one,
				fromStreetNumber2: label.sender_street_two,
				fromZip: label.sender_zip,
				fromCity: label.sender_city,
				fromState: label.sender_state,
				toCountry: label.recipent_country,
				toName: label.recipent_full_name,
				toRefNumber: label.recipent_company_name,
				toStreetNumber: label.recipent_street_one,
				toStreetNumber2: label.recipent_street_two,
				toZip: label.recipent_zip,
				toCity: label.recipent_city,
				toState: label.recipent_state,
			}),
		});

		log("Generated USPS label.");

		var payload: ApiResponseProps;

		try {
			payload = (await req.json()) as ApiResponseProps;
		} catch (err) {
			payload = { message: (err as Error).message, payload: {} };
		}
		log("Parsed USPS label. Payload: " + JSON.stringify(payload));

		if (!req.ok) {
			this.crons.push({ uuid: label.uuid, message: payload.message });
		}

		return payload;
	}

	async generateUSPSLabelFromBatch(
		batch: BatchsSelectModel,
		recipient: Address.UUIDSCHEMA,
		costs: { user: number; reseller: number },
	) {
		log(`${batch.type_value} ======`);
		const req = await fetch(`${this.settings["label_host"]}/api/label/generate`, {
			method: "POST",
			headers: { "Content-Type": "application/json", "x-api-key": this.settings["label_apikey"] },
			body: JSON.stringify({
				type: getValueFromServiceToken(batch.type_value),
				weight: batch.package_weight,
				date: batch.shipping_date,
				fromCountry: batch.sender_country,
				fromName: batch.sender_full_name,
				fromRefNumber: batch.sender_company_name,
				fromStreetNumber: batch.sender_street_one,
				fromStreetNumber2: batch.sender_street_two,
				fromZip: batch.sender_zip,
				fromCity: batch.sender_city,
				fromState: batch.sender_state,
				toCountry: recipient.country,
				toName: recipient.full_name,
				toRefNumber: recipient.company_name,
				toStreetNumber: recipient.street_one,
				toStreetNumber2: recipient.street_two,
				toZip: recipient.zip,
				toCity: recipient.city,
				toState: recipient.state,
			}),
		});
		log("Generated USPS label.");

		var payload: any;

		try {
			payload = (await req.json()) as any;
		} catch (err) {
			payload = { message: (err as Error).message, payload: {} };
		}
		log(`Parsed USPS label. Payload: ${payload.message}`);

		if (!req.ok) {
			this.crons.push({ uuid: recipient.uuid, message: payload.message });
		}
		console.log(payload.payload);
		this.pushLabelToPrivateArray(
			batch,
			recipient,
			{
				code: req.ok && payload.payload.code ? payload.payload.code : null,
				id: req.ok && payload.payload.id ? payload.payload.id : null,
				pdf: req.ok && payload.payload.pdf ? payload.payload.pdf.split("/")[4] : "",
				status: req.ok ? "awaiting" : "pending",
				message: payload.message,
			},
			costs,
		);

		log("Pushed label to private array.");
	}
	async generateFedexLabelFromBatch(
		batch: BatchsSelectModel,
		recipient: Address.UUIDSCHEMA,
		costs: { user: number; reseller: number },
	) {
		log(`${batch.type_value} ======`);
		const req = await fetch(`${this.settings["label_host"]}/api/label/generate-fedex`, {
			method: "POST",
			headers: { "Content-Type": "application/json", "x-api-key": this.settings["label_apikey"] },
			body: JSON.stringify({
				type: getValueFromServiceToken(batch.type_value),
				weight: batch.package_weight,
				date: batch.shipping_date,
				fromCountry: batch.sender_country,
				fromName: batch.sender_full_name,
				fromRefNumber: batch.sender_company_name,
				fromStreetNumber: batch.sender_street_one,
				fromStreetNumber2: batch.sender_street_two,
				fromZip: batch.sender_zip,
				fromCity: batch.sender_city,
				fromState: batch.sender_state,
				toCountry: recipient.country,
				toName: recipient.full_name,
				toRefNumber: recipient.company_name,
				toStreetNumber: recipient.street_one,
				toStreetNumber2: recipient.street_two,
				toZip: recipient.zip,
				toCity: recipient.city,
				toState: recipient.state,
			}),
		});
		log("Generated Fedex label.");

		var payload: any;

		try {
			payload = (await req.json()) as any;
		} catch (err) {
			payload = { message: (err as Error).message, payload: {} };
		}
		log(`Parsed Fedex label. Payload: ${payload.message}`);

		if (!req.ok) {
			this.crons.push({ uuid: recipient.uuid, message: payload.message });
		}
		console.log(payload.payload);
		this.pushLabelToPrivateArray(
			batch,
			recipient,
			{
				code: req.ok && payload.payload.code ? payload.payload.code : null,
				id: req.ok && payload.payload.id ? payload.payload.id : null,
				pdf: req.ok && payload.payload.pdf ? payload.payload.pdf.split("/")[4] : "",
				status: req.ok ? "awaiting" : "pending",
				message: payload.message,
			},
			costs,
		);

		log("Pushed label to private array.");
	}

	async generateUPSLabel(label: LabelsSelectModel) {
		const req = await fetch(`${this.settings["label_host"]}/api/label/generate-ups`, {
			method: "POST",
			headers: { "Content-Type": "application/json", "x-api-key": this.settings["label_apikey"] },
			body: JSON.stringify({
				type: getValueFromServiceToken(label.type_value),
				weight: label.package_weight,
				height: label.package_height + 2,
				width: label.package_width + 2,
				length: label.package_length + 2,
				saturday: label.saturday,
				signature: label.signature,
				date: label.shipping_date,
				fromName: label.sender_full_name,
				fromCompany: label.sender_company_name,
				fromStreetNumber: label.sender_street_one,
				fromStreetNumber2: label.sender_street_two,
				fromZip: label.sender_zip,
				fromCity: label.sender_city,
				fromState: label.sender_state,
				toName: label.recipent_full_name,
				toCompany: label.recipent_company_name,
				toStreetNumber: label.recipent_street_one,
				toStreetNumber2: label.recipent_street_two,
				toZip: label.recipent_zip,
				toCity: label.recipent_city,
				toState: label.recipent_state,
			}),
		});
		log("Generated UPS label.");

		var payload: ApiUpsResponseProps;

		try {
			payload = (await req.json()) as ApiUpsResponseProps;
		} catch (err) {
			payload = { message: (err as Error).message, payload: {} };
		}
		log(`Parsed UPS label. Payload: ${payload.message}`);

		if (!req.ok) {
			this.crons.push({ uuid: label.uuid, message: payload.message });
		}

		return payload;
	}
	async generateFEDEXLabel(label: LabelsSelectModel) {
		const req = await fetch(`${this.settings["label_host"]}/api/label/generate-fedex`, {
			method: "POST",
			headers: { "Content-Type": "application/json", "x-api-key": this.settings["label_apikey"] },
			body: JSON.stringify({
				type: getValueFromServiceToken(label.type_value),
				weight: label.package_weight,
				height: label.package_height + 2,
				width: label.package_width + 2,
				length: label.package_length + 2,
				saturday: label.saturday,
				signature: label.signature,
				date: label.shipping_date,
				fromName: label.sender_full_name,
				fromCompany: label.sender_company_name,
				fromStreetNumber: label.sender_street_one,
				fromStreetNumber2: label.sender_street_two,
				fromZip: label.sender_zip,
				fromCity: label.sender_city,
				fromState: label.sender_state,
				toName: label.recipent_full_name,
				toCompany: label.recipent_company_name,
				toStreetNumber: label.recipent_street_one,
				toStreetNumber2: label.recipent_street_two,
				toZip: label.recipent_zip,
				toCity: label.recipent_city,
				toState: label.recipent_state,
			}),
		});
		log("Generated Fedex label.");

		var payload: ApiUpsResponseProps;

		try {
			payload = (await req.json()) as ApiUpsResponseProps;
		} catch (err) {
			payload = { message: (err as Error).message, payload: {} };
		}
		log(`Parsed Fedex label. Payload: ${payload.message}`);

		if (!req.ok) {
			this.crons.push({ uuid: label.uuid, message: payload.message });
		}

		return payload;
	}

	async generateUPSLabelFromBatch(
		batch: BatchsSelectModel,
		recipient: Address.UUIDSCHEMA,
		costs: { user: number; reseller: number },
	) {
		console.log(batch, ` --------------> sdgsdf`);
		const req = await fetch(`${this.settings["label_host"]}/api/label/generate-ups`, {
			method: "POST",
			headers: { "Content-Type": "application/json", "x-api-key": this.settings["label_apikey"] },
			body: JSON.stringify({
				type: getValueFromServiceToken(batch.type_value),
				weight: batch.package_weight,
				height: batch.package_height + 2,
				width: batch.package_width + 2,
				length: batch.package_length + 2,
				saturday: batch.saturday,
				signature: batch.signature,
				date: batch.shipping_date,
				fromPhone: batch.sender_phone,
				fromName: batch.sender_full_name,
				fromCompany: batch.sender_company_name,
				fromStreetNumber: batch.sender_street_one,
				fromStreetNumber2: batch.sender_street_two,
				fromZip: batch.sender_zip,
				fromCity: batch.sender_city,
				fromState: batch.sender_state,
				toPhone: recipient.phone,
				toName: recipient.full_name,
				toCompany: recipient.company_name,
				toStreetNumber: recipient.street_one,
				toStreetNumber2: recipient.street_two,
				toZip: recipient.zip,
				toCity: recipient.city,
				toState: recipient.state,
			}),
		});
		log("Generated UPS label.");
		console.log(await req.json());
		var payload: ApiUpsResponseProps;

		try {
			payload = (await req.json()) as ApiUpsResponseProps;
		} catch (err) {
			payload = { message: (err as Error).message, payload: {} };
		}
		log("Parsed UPS label. Payload:----------> " + JSON.stringify(payload));

		if (!req.ok) {
			this.crons.push({ uuid: recipient.uuid, message: payload.message });
		}

		this.pushLabelToPrivateArray(
			batch,
			recipient,
			{
				code: req.ok && payload.payload.tracking ? payload.payload.tracking : null,
				id: req.ok && payload.payload.id ? payload.payload.id : null,
				pdf: req.ok && payload.payload.pdf ? payload.payload.pdf.split("/")[5] : "",
				status: req.ok ? "awaiting" : "pending",
				message: payload.message,
			},
			costs,
		);
		log("Pushed label to private array.");
	}

	async downloadUSPSLabel(pdfkey: string) {
		const req = await fetch(`${this.settings["label_host"]}/labels/${pdfkey}`);
		const buffer = await req.arrayBuffer();
		log("Downloaded USPS label.");

		await this.env.LABELS_BUCKET.put(pdfkey, buffer);
		log("Uploaded USPS label to R2.");

		return buffer;
	}

	async downloadUPSLabel(pdfkey: string) {
		const req = await fetch(`${this.settings["label_host"]}/labels/ups/${pdfkey}`);
		const buffer = await req.arrayBuffer();
		log("Downloaded UPS label.");

		await this.env.LABELS_BUCKET.put(pdfkey, buffer);
		log("Uploaded UPS label to R2.");

		return buffer;
	}
	async downloadFedexLabel(pdfkey: string) {
		const req = await fetch(`${this.settings["label_host"]}/labels/fedex/${pdfkey}`);
		const buffer = await req.arrayBuffer();
		log("Downloaded FEDEX label.");

		await this.env.LABELS_BUCKET.put(pdfkey, buffer);
		log("Uploaded FEDEX label to R2.");

		return buffer;
	}

	async downloadMergePdf(filename: string, merger: PDFMerger) {
		const buffer = await merger.saveAsBuffer();

		await this.env.LABELS_BUCKET.put(filename, buffer);
		log("Uploaded merged pdf to R2.");

		return buffer;
	}

	async notifyBatchDownloadCompleteEvent(batch_uuid: string) {
		console.log("notifyBatchDownloadCompleteEvent", batch_uuid);
	}

	async updateBatchFirstTrackingNumber(batch_uuid: string) {
		return await drizzle(this.env.DB)
			.update(batchs)
			.set({ tracking_number: this.labels[0].remote_tracking_number })
			.where(eq(batchs.uuid, batch_uuid))
			.execute();
	}

	async updateLabelBatchStatus(batch_uuid: string) {
		await drizzle(this.env.DB)
			.update(batchs)
			.set({
				status_label: "completed",
				status_message: "Batch is completed",
				merge_pdf_key: `${batch_uuid}.pdf`,
				is_downloaded: true,
			})
			.where(eq(batchs.uuid, batch_uuid))
			.execute();
		log("Updated batch status.");
	}

	async updateUSPSLabelStatus({ payload, id }: { payload: ApiResponseProps; id: number }) {
		return await drizzle(this.env.DB)
			.update(labels)
			.set({
				remote_tracking_number: payload.payload.code,
				remote_pdf_link: payload.payload.pdf!.split("/")[4] || "",
				remote_pdf_r2_link: payload.payload.pdf!.split("/")[4] || "",
				status_label: "awaiting",
				status_message: payload.message,
			})
			.where(eq(labels.id, id))
			.execute();
	}

	async updateUPSLabelStatus({ payload, id }: { payload: ApiUpsResponseProps; id: number }) {
		return await drizzle(this.env.DB)
			.update(labels)
			.set({
				remote_tracking_number: payload.payload.tracking,
				remote_pdf_link: payload.payload.pdf!.split("/")[5] || "",
				remote_pdf_r2_link: payload.payload.pdf!.split("/")[5] || "",
				status_label: "awaiting",
				status_message: payload.message,
			})
			.where(eq(labels.id, id))
			.execute();
	}
	async updateFEDEXLabelStatus({ payload, id }: { payload: ApiUpsResponseProps; id: number }) {
		return await drizzle(this.env.DB)
			.update(labels)
			.set({
				remote_tracking_number: payload.payload.tracking,
				remote_pdf_link: payload.payload.pdf!.split("/")[5] || "",
				remote_pdf_r2_link: payload.payload.pdf!.split("/")[5] || "",
				status_label: "awaiting",
				status_message: payload.message,
			})
			.where(eq(labels.id, id))
			.execute();
	}

	async updateLabelDownloadStatusFromDrizzleBatch(uuids: string[]) {
		log("---------> hi");
		log(`${uuids}--------> d`);
		return await drizzle(this.env.DB).batch(
			// @ts-expect-error type error
			uuids.map((uuid) =>
				drizzle(this.env.DB).update(labels).set({ is_downloaded: true }).where(eq(labels.uuid, uuid)),
			),
		);
	}

	private pushLabelToPrivateArray(
		batch: BatchsSelectModel,
		recipient: Address.UUIDSCHEMA,
		payload: { code?: string | null; id?: number | null; pdf?: string; status: string; message: string },
		costs: { user: number; reseller: number },
	) {
		this.labels.push({
			shipping_date: batch.shipping_date,

			cost_reseller: costs.reseller,
			cost_user: costs.user,

			// Package
			package_height: batch.package_height,
			package_length: batch.package_length,
			package_weight: batch.package_weight,
			package_width: batch.package_width,
			package_id: batch.package_id,
			package_name: batch.package_name,

			// Recipient
			recipent_city: recipient.city,
			recipent_country: recipient.country,
			recipent_full_name: recipient.full_name,
			recipent_state: recipient.state,
			recipent_street_one: recipient.street_one,
			recipent_zip: recipient.zip,
			recipent_company_name: recipient.company_name,
			recipent_street_two: recipient.street_two,
			recipent_phone: recipient.phone,

			// Sender
			sender_city: batch.sender_city,
			sender_country: batch.sender_country,
			sender_full_name: batch.sender_full_name,
			sender_state: batch.sender_state,
			sender_street_one: batch.sender_street_one,
			sender_zip: batch.sender_zip,
			sender_company_name: batch.sender_company_name,
			sender_street_two: batch.sender_street_two,
			sender_phone: batch.sender_phone,

			// Type
			type: batch.type,
			type_label: batch.type_label,
			type_unit: batch.type_unit,
			type_value: batch.type_value,

			// Remote
			remote_id: payload.id,
			remote_tracking_number: payload.code,
			remote_pdf_link: payload.pdf,
			remote_pdf_r2_link: payload.pdf,

			status_label: payload.status,
			status_message: payload.message,

			// Ids
			user_id: batch.user_id,
			uuid: recipient.uuid,
			batch_uuid: batch.uuid,
		});

		if (!payload.pdf || payload.pdf === null || payload.pdf === "") return;

		this.pdfs.push({ type: batch.type, pdf: payload.pdf, uuid: recipient.uuid });
	}
}