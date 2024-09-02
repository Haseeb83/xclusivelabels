import { z } from "zod";

export const FETCHSCHEMA = z.object({
	weight: z.coerce.number().min(1),
	type_id: z.number().min(1),
	type: z.enum(["usps", "ups"]),
});

export type FETCHSCHEMA = z.infer<typeof FETCHSCHEMA>;

export const CREATESCHEMA = z.object({
	to_weight: z.coerce.number().min(1),
	from_weight: z.coerce.number().min(1),
	user_cost: z.coerce.number(),
	reseller_cost: z.coerce.number(),
	type_id: z.string().min(1),
});

export type CREATESCHEMA = z.infer<typeof CREATESCHEMA>;

export const EDITSCHEMA = CREATESCHEMA.merge(z.object({ id: z.number() }));

export type EDITSCHEMA = z.infer<typeof EDITSCHEMA>;
