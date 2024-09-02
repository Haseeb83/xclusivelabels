import { z } from "zod";

export const ZODSCHEMA = z.object({
	email_address: z.string(),
	password: z.string(),
});

export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
