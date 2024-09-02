import z from "zod";
export declare const ZODSCHEMA: z.ZodObject<{
    batch_uuid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    batch_uuid?: string;
}, {
    batch_uuid?: string;
}>;
export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
export declare const IDUUIDSCHEMA: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
}, {
    id?: string;
}>;
export type IDUUIDSCHEMA = z.infer<typeof IDUUIDSCHEMA>;
//# sourceMappingURL=refund.d.ts.map