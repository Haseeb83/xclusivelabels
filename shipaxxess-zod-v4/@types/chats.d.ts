import z from "zod";
export declare const ZODSCHEMA: z.ZodObject<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message?: string;
}, {
    message?: string;
}>;
export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
export declare const IDZODSCHEMA: z.ZodObject<{
    message: z.ZodString;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    message?: string;
    id?: number;
}, {
    message?: string;
    id?: number;
}>;
export type IDZODSCHEMA = z.infer<typeof IDZODSCHEMA>;
//# sourceMappingURL=chats.d.ts.map
