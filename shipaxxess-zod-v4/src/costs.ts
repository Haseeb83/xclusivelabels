import { z } from "zod";

export const ZODSCHEMA = z.object({
	reseller_cost: z.number(),
	user_cost: z.number(),
});

export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
