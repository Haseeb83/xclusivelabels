import { z } from "zod";
export declare const FETCHSCHEMA: z.ZodObject<{
    weight: z.ZodNumber;
    type_id: z.ZodNumber;
    type: z.ZodEnum<["usps", "ups"]>;
}, "strip", z.ZodTypeAny, {
    weight?: number;
    type_id?: number;
    type?: "usps" | "ups";
}, {
    weight?: number;
    type_id?: number;
    type?: "usps" | "ups";
}>;
export type FETCHSCHEMA = z.infer<typeof FETCHSCHEMA>;
export declare const CREATESCHEMA: z.ZodObject<{
    to_weight: z.ZodNumber;
    from_weight: z.ZodNumber;
    user_cost: z.ZodNumber;
    reseller_cost: z.ZodNumber;
    type_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    to_weight?: number;
    from_weight?: number;
    user_cost?: number;
    reseller_cost?: number;
    type_id?: string;
}, {
    to_weight?: number;
    from_weight?: number;
    user_cost?: number;
    reseller_cost?: number;
    type_id?: string;
}>;
export type CREATESCHEMA = z.infer<typeof CREATESCHEMA>;
export declare const EDITSCHEMA: z.ZodObject<{
    reseller_cost: z.ZodNumber;
    user_cost: z.ZodNumber;
    type_id: z.ZodString;
    to_weight: z.ZodNumber;
    from_weight: z.ZodNumber;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    reseller_cost?: number;
    user_cost?: number;
    type_id?: string;
    to_weight?: number;
    from_weight?: number;
    id?: number;
}, {
    reseller_cost?: number;
    user_cost?: number;
    type_id?: string;
    to_weight?: number;
    from_weight?: number;
    id?: number;
}>;
export type EDITSCHEMA = z.infer<typeof EDITSCHEMA>;
//# sourceMappingURL=weights.d.ts.map