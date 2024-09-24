import { z } from "zod";
export declare const ZODSCHEMA: z.ZodObject<{
    email_address: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email_address?: string;
    password?: string;
}, {
    email_address?: string;
    password?: string;
}>;
export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
//# sourceMappingURL=signin.d.ts.map