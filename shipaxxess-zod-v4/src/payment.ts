import { z } from "zod";

export const ZODSCHEMA = z.object({
	gateway: z.string(),
	credit: z.coerce.number(),
});

export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;

export const ACCEPTSCHEMA = z.object({
	payment_id: z.number(),
});

export type ACCEPTSCHEMA = z.infer<typeof ACCEPTSCHEMA>;

export const REJECTSCHEMA = z.object({
	payment_id: z.number(),
});

export type REJECTSCHEMA = z.infer<typeof REJECTSCHEMA>;
