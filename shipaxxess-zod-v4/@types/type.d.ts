import { z } from "zod";
export declare const ZODSCHEMA: z.ZodObject<{
    label: z.ZodString;
    value: z.ZodString;
    unit: z.ZodEnum<["oz", "lb"]>;
    type: z.ZodEnum<["usps", "ups"]>;
}, "strip", z.ZodTypeAny, {
    label?: string;
    value?: string;
    unit?: "oz" | "lb";
    type?: "usps" | "ups";
}, {
    label?: string;
    value?: string;
    unit?: "oz" | "lb";
    type?: "usps" | "ups";
}>;
export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
export declare const IDZODSCHEMA: z.ZodObject<{
    type: z.ZodEnum<["usps", "ups"]>;
    value: z.ZodString;
    label: z.ZodString;
    unit: z.ZodEnum<["oz", "lb"]>;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type?: "usps" | "ups";
    value?: string;
    label?: string;
    unit?: "oz" | "lb";
    id?: number;
}, {
    type?: "usps" | "ups";
    value?: string;
    label?: string;
    unit?: "oz" | "lb";
    id?: number;
}>;
export type IDZODSCHEMA = z.infer<typeof IDZODSCHEMA>;
export declare const CREATESCHEMA: z.ZodObject<{
    label: z.ZodString;
    value: z.ZodString;
    unit: z.ZodEnum<["oz", "lb"]>;
    type: z.ZodEnum<["usps", "ups"]>;
}, "strip", z.ZodTypeAny, {
    label?: string;
    value?: string;
    unit?: "oz" | "lb";
    type?: "usps" | "ups";
}, {
    label?: string;
    value?: string;
    unit?: "oz" | "lb";
    type?: "usps" | "ups";
}>;
export type CREATESCHEMA = z.infer<typeof CREATESCHEMA>;
export declare const EDITSCHEMA: z.ZodObject<{
    type: z.ZodEnum<["usps", "ups"]>;
    value: z.ZodString;
    label: z.ZodString;
    unit: z.ZodEnum<["oz", "lb"]>;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type?: "usps" | "ups";
    value?: string;
    label?: string;
    unit?: "oz" | "lb";
    id?: number;
}, {
    type?: "usps" | "ups";
    value?: string;
    label?: string;
    unit?: "oz" | "lb";
    id?: number;
}>;
export type EDITSCHEMA = z.infer<typeof EDITSCHEMA>;
//# sourceMappingURL=type.d.ts.map