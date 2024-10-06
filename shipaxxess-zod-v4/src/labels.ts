import moment from "moment-timezone";
import { z } from "zod";
import * as Address from "./address";
import * as Package from "./package";
import * as Type from "./type";

export const COMMONSCHEMA = z.object({
	sender: Address.ZODSCHEMA,
	sender_select: z.string().optional(),
	package: Package.IDOPTIONAL,
	package_select: z.string().optional(),
	type: Type.IDZODSCHEMA,
	type_select: z.string().optional(),
	shippingdate: z
		.string()
		.transform((val) => {
			return moment(val).format("MM/DD/YYYY");
		})
		.optional(),
	reference1: z.string().optional(),
	description: z.string().optional(),
	saturday: z.boolean().optional(),
	signature: z.boolean().optional(),
	name: z.string().optional(),
	saved_sender: z.boolean().default(false),
	coupon: z.string().optional(),
});

export type COMMONSCHEMA = z.infer<typeof COMMONSCHEMA>;

export const ZODSCHEMA = COMMONSCHEMA.merge(
	z.object({
		recipient: Address.ZODSCHEMA,
	}),
);

export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;

export const RECIPIENTSCHEMAARRAY = z
	.array(Address.ZODSCHEMA.merge(z.object({ uuid: z.string().uuid(), phone: z.string().optional() })))
	.min(1);

export type RECIPIENTSCHEMAARRAY = z.infer<typeof RECIPIENTSCHEMAARRAY>;

export const BATCHZODSCHEMA = COMMONSCHEMA.merge(
	z.object({
		batch_uuid: z.string().uuid(),
		recipient: RECIPIENTSCHEMAARRAY,
	}),
);

export type BATCHZODSCHEMA = z.infer<typeof BATCHZODSCHEMA>;

export const SEARCHZODSCHEMA = z.object({
	uuid: z.string().optional(),
	name: z.string().optional(),
	weight: z.string().optional(),
	delivery_id: z.string().optional(),
	delivery_type: z.string().optional(),
	weight_unit_query: z.string().optional(),
	status: z.string().optional(),
	from_date: z.date().optional(),
	end_date: z.date().optional(),
	search_type: z.enum(["label", "batch"]),
});

export type SEARCHZODSCHEMA = z.infer<typeof SEARCHZODSCHEMA>;