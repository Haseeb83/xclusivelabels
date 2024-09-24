import { z } from "zod";

export const ZODSCHEMA = z.object({
	first_name: z.string().min(1),
	last_name: z.string().min(1),
	email_address: z.string().email(),
	password: z.string().min(6),
	refer_from: z.string().optional(),
});

export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
