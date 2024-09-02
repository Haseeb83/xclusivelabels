import { z } from "zod";
export declare const ZODSCHEMA: z.ZodObject<{
    first_name: z.ZodString;
    last_name: z.ZodString;
    email_address: z.ZodString;
    password: z.ZodString;
    refer_from: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    first_name?: string;
    last_name?: string;
    email_address?: string;
    password?: string;
    refer_from?: string;
}, {
    first_name?: string;
    last_name?: string;
    email_address?: string;
    password?: string;
    refer_from?: string;
}>;
export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
//# sourceMappingURL=signup.d.ts.map