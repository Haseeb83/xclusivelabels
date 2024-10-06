import { z } from "zod";
export declare const FETCHSCHEMA: z.ZodObject<{
    weight: z.ZodNumber;
    type_id: z.ZodNumber;
    type: z.ZodEnum<["usps", "ups", "fedex"]>;
}, "strip", z.ZodTypeAny, {
    weight?: number;
    type_id?: number;
    type?: "usps" | "ups" | "fedex";
}, {
    weight?: number;
    type_id?: number;
    type?: "usps" | "ups" | "fedex";
}>;
export type FETCHSCHEMA = z.infer<typeof FETCHSCHEMA>;
export declare const CREATESCHEMA: z.ZodObject<{
    width: z.ZodNumber;
    height: z.ZodNumber;
    length: z.ZodNumber;
    weight: z.ZodNumber;
    width_percent: z.ZodNumber;
    height_percent: z.ZodNumber;
    length_percent: z.ZodNumber;
    user_cost: z.ZodNumber;
    reseller_cost: z.ZodNumber;
    type_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    width?: number;
    height?: number;
    length?: number;
    weight?: number;
    width_percent?: number;
    height_percent?: number;
    length_percent?: number;
    user_cost?: number;
    reseller_cost?: number;
    type_id?: string;
}, {
    width?: number;
    height?: number;
    length?: number;
    weight?: number;
    width_percent?: number;
    height_percent?: number;
    length_percent?: number;
    user_cost?: number;
    reseller_cost?: number;
    type_id?: string;
}>;
export type CREATESCHEMA = z.infer<typeof CREATESCHEMA>;
export declare const EDITSCHEMA: z.ZodObject<{
    reseller_cost: z.ZodNumber;
    user_cost: z.ZodNumber;
    type_id: z.ZodString;
    width: z.ZodNumber;
    height: z.ZodNumber;
    length: z.ZodNumber;
    weight: z.ZodNumber;
    width_percent: z.ZodNumber;
    height_percent: z.ZodNumber;
    length_percent: z.ZodNumber;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    reseller_cost?: number;
    user_cost?: number;
    type_id?: string;
    width?: number;
    height?: number;
    length?: number;
    weight?: number;
    width_percent?: number;
    height_percent?: number;
    length_percent?: number;
    id?: number;
}, {
    reseller_cost?: number;
    user_cost?: number;
    type_id?: string;
    width?: number;
    height?: number;
    length?: number;
    weight?: number;
    width_percent?: number;
    height_percent?: number;
    length_percent?: number;
    id?: number;
}>;
export type EDITSCHEMA = z.infer<typeof EDITSCHEMA>;
//# sourceMappingURL=weights.d.ts.map