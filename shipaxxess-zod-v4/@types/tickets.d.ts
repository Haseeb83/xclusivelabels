import { z } from "zod";
export declare const ZODSCHEMA: z.ZodObject<{
    title: z.ZodString;
    type: z.ZodString;
    content: z.ZodString;
    data_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string;
    type?: string;
    content?: string;
    data_id?: string;
}, {
    title?: string;
    type?: string;
    content?: string;
    data_id?: string;
}>;
export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
export declare const IDZODSCHEMA: z.ZodObject<{
    type: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
    data_id: z.ZodOptional<z.ZodString>;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type?: string;
    title?: string;
    content?: string;
    data_id?: string;
    id?: number;
}, {
    type?: string;
    title?: string;
    content?: string;
    data_id?: string;
    id?: number;
}>;
export type IDZODSCHEMA = z.infer<typeof IDZODSCHEMA>;
export declare const POSTMESSAGE: z.ZodObject<{
    id: z.ZodNumber;
    message: z.ZodString;
    author: z.ZodString;
    message_profile: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: number;
    message?: string;
    author?: string;
    message_profile?: string;
}, {
    id?: number;
    message?: string;
    author?: string;
    message_profile?: string;
}>;
export type POSTMESSAGE = z.infer<typeof POSTMESSAGE>;
//# sourceMappingURL=tickets.d.ts.map