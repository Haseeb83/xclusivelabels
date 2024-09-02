import { z } from "zod";

export const ZODSCHEMA = z.object({
	id: z.number(),
});

export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;

export const UUIDSCHEMA = z.object({
	uuid: z.string(),
});

export type UUIDSCHEMA = z.infer<typeof UUIDSCHEMA>;
