import { z } from "zod";
export declare const ZODSCHEMA: z.ZodObject<{
    gateway: z.ZodString;
    credit: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    gateway?: string;
    credit?: number;
}, {
    gateway?: string;
    credit?: number;
}>;
export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
export declare const ACCEPTSCHEMA: z.ZodObject<{
    payment_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    payment_id?: number;
}, {
    payment_id?: number;
}>;
export type ACCEPTSCHEMA = z.infer<typeof ACCEPTSCHEMA>;
export declare const REJECTSCHEMA: z.ZodObject<{
    payment_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    payment_id?: number;
}, {
    payment_id?: number;
}>;
export type REJECTSCHEMA = z.infer<typeof REJECTSCHEMA>;
//# sourceMappingURL=payment.d.ts.map