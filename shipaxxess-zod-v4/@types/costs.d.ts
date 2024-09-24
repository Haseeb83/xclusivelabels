import { z } from "zod";
export declare const ZODSCHEMA: z.ZodObject<{
    reseller_cost: z.ZodNumber;
    user_cost: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    reseller_cost?: number;
    user_cost?: number;
}, {
    reseller_cost?: number;
    user_cost?: number;
}>;
export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
//# sourceMappingURL=costs.d.ts.map