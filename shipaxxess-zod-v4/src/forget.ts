import { z } from "zod";

export const ZODSCHEMA = z.object({
	email_address: z.string().email(),
});

export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
