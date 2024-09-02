import { z } from "zod";

export const ZODSCHEMA = z.object({
	weight: z.coerce.number().min(1),
	height: z.coerce.number().min(1),
	width: z.coerce.number().min(1),
	length: z.coerce.number().min(1),
	name: z.string(),
	radio: z.string().optional(),
});

export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;

export const IDZODSCHEMA = ZODSCHEMA.merge(z.object({ id: z.number() }));

export type IDZODSCHEMA = z.infer<typeof IDZODSCHEMA>;

export const IDOPTIONAL = ZODSCHEMA.merge(z.object({ id: z.number().optional() }));

export type IDOPTIONAL = z.infer<typeof IDOPTIONAL>;

export const UUIDZODSCHEMA = ZODSCHEMA.merge(z.object({ uuid: z.string().uuid() }));

export type UUIDZODSCHEMA = z.infer<typeof UUIDZODSCHEMA>;
