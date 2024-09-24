import z from "zod";
export declare const ZODSCHEMA: z.ZodObject<{
    email_address: z.ZodString;
    code: z.ZodString;
    type: z.ZodEnum<["email_verification", "reset", "two_fa"]>;
}, "strip", z.ZodTypeAny, {
    email_address?: string;
    code?: string;
    type?: "two_fa" | "email_verification" | "reset";
}, {
    email_address?: string;
    code?: string;
    type?: "two_fa" | "email_verification" | "reset";
}>;
export type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;
//# sourceMappingURL=verify.d.ts.map