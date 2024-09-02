import { z } from "zod";
export declare const ZODSCHEMA: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id?: number;
}, {
    id?: number;
}>;
export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
export declare const UUIDSCHEMA: z.ZodObject<{
    uuid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uuid?: string;
}, {
    uuid?: string;
}>;
export type UUIDSCHEMA = z.infer<typeof UUIDSCHEMA>;
//# sourceMappingURL=id.d.ts.map