import { z } from "zod";
export declare const ZODSCHEMA: z.ZodObject<{
    weight: z.ZodNumber;
    height: z.ZodNumber;
    width: z.ZodNumber;
    length: z.ZodNumber;
    name: z.ZodString;
    radio: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    weight?: number;
    height?: number;
    width?: number;
    length?: number;
    name?: string;
    radio?: string;
}, {
    weight?: number;
    height?: number;
    width?: number;
    length?: number;
    name?: string;
    radio?: string;
}>;
export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
export declare const IDZODSCHEMA: z.ZodObject<{
    length: z.ZodNumber;
    name: z.ZodString;
    weight: z.ZodNumber;
    height: z.ZodNumber;
    width: z.ZodNumber;
    radio: z.ZodOptional<z.ZodString>;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    length?: number;
    name?: string;
    weight?: number;
    height?: number;
    width?: number;
    radio?: string;
    id?: number;
}, {
    length?: number;
    name?: string;
    weight?: number;
    height?: number;
    width?: number;
    radio?: string;
    id?: number;
}>;
export type IDZODSCHEMA = z.infer<typeof IDZODSCHEMA>;
export declare const IDOPTIONAL: z.ZodObject<{
    length: z.ZodNumber;
    name: z.ZodString;
    weight: z.ZodNumber;
    height: z.ZodNumber;
    width: z.ZodNumber;
    radio: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    length?: number;
    name?: string;
    weight?: number;
    height?: number;
    width?: number;
    radio?: string;
    id?: number;
}, {
    length?: number;
    name?: string;
    weight?: number;
    height?: number;
    width?: number;
    radio?: string;
    id?: number;
}>;
export type IDOPTIONAL = z.infer<typeof IDOPTIONAL>;
export declare const UUIDZODSCHEMA: z.ZodObject<{
    length: z.ZodNumber;
    name: z.ZodString;
    weight: z.ZodNumber;
    height: z.ZodNumber;
    width: z.ZodNumber;
    radio: z.ZodOptional<z.ZodString>;
    uuid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    length?: number;
    name?: string;
    weight?: number;
    height?: number;
    width?: number;
    radio?: string;
    uuid?: string;
}, {
    length?: number;
    name?: string;
    weight?: number;
    height?: number;
    width?: number;
    radio?: string;
    uuid?: string;
}>;
export type UUIDZODSCHEMA = z.infer<typeof UUIDZODSCHEMA>;
//# sourceMappingURL=package.d.ts.map