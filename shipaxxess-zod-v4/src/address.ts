import { z } from "zod";

export const ZODSCHEMA = z.object({
	full_name: z.string().min(1),
	company_name: z.string().optional(),
	street_one: z.string().min(1),
	street_two: z.string().optional(),
	city: z.string().min(1),
	zip: z.string().min(1),
	state: z.string().min(1),
	phone: z.string(),
	country: z.string().default("United States"),
});

export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;

export const IDZODSCHEMA = ZODSCHEMA.merge(z.object({ id: z.number() }));

export type IDZODSCHEMA = z.infer<typeof IDZODSCHEMA>;

export const UUIDSCHEMA = ZODSCHEMA.merge(z.object({ uuid: z.string() }));

export type UUIDSCHEMA = z.infer<typeof UUIDSCHEMA>;

export const WITHNAMESCHEMA = ZODSCHEMA.merge(z.object({ name: z.string() }));

export type WITHNAMESCHEMA = z.infer<typeof WITHNAMESCHEMA>;

export const PHONEOPTIONALSCHEMA = WITHNAMESCHEMA.merge(z.object({ phone: z.string().optional() }));

export type PHONEOPTIONALSCHEMA = z.infer<typeof PHONEOPTIONALSCHEMA>;

export const ONLYPHONEOPTIONALSCHEMA = ZODSCHEMA.merge(z.object({ phone: z.string().optional() }));

export type ONLYPHONEOPTIONALSCHEMA = z.infer<typeof ONLYPHONEOPTIONALSCHEMA>;

export const PHONEOPTIONALWITHUUIDSCHEMA = PHONEOPTIONALSCHEMA.merge(z.object({ uuid: z.string() }));

export type PHONEOPTIONALWITHUUIDSCHEMA = z.infer<typeof PHONEOPTIONALWITHUUIDSCHEMA>;
