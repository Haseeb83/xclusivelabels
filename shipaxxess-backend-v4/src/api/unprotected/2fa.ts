import { config } from "@config";
import { Model as MyMdel } from "@lib/model";
import { users } from "@schemas/users";
import { Verify } from "@shipaxxess/shipaxxess-zod-v4";
import { exception } from "@utils/error";
import { and, eq } from "drizzle-orm";
import { Context } from "hono";
import { sign } from "hono/jwt";

// Enable 2FA endpoint
const Enable2FA = async (c: Context<App>) => {
    const body = await c.req.json();
    const { userId } = body; // User ID should be securely provided

    if (!userId) {
        return c.json({ message: "User ID is required" }, 400);
    }

    const model = new Model(c.env.DB);
    await model.updateUser2FAStatus(userId, "true");

    // Generate and return 2FA setup code or QR code here
    // Placeholder: return a message indicating 2FA has been enabled
    return c.json({ message: "2FA has been enabled" });
};

// Disable 2FA endpoint
const Disable2FA = async (c: Context<App>) => {
    const body = await c.req.json();
    const { userId } = body; // User ID should be securely provided

    if (!userId) {
        return c.json({ message: "User ID is required" }, 400);
    }

    const model = new Model(c.env.DB);
    await model.updateUser2FAStatus(userId, "false");

    return c.json({ message: "2FA has been disabled" });
};

// Existing 2FA Verification endpoint
const Post = async (c: Context<App>) => {
    const body = await c.req.json();
    const parse = Verify.ZODSCHEMA.parse(body);

    if (parse.type !== "two_fa") throw exception({ message: "Invalid type", code: 400 });

    const model = new Model(c.env.DB);

    const user = await model.get(
        users,
        and(eq(users.email_address, parse.email_address), eq(users.temp_fa_code, parse.code)),
    );

    if (!user) throw exception({ message: "Invalid code", code: 400 });

    // Check if 2FA is enabled
    if (user.two_fa !== "true") {
        throw exception({ message: "2FA is not enabled for this user", code: 400 });
    }

    const token = await sign(
        {
            id: user.id,
            uuid: user.uuid,
            email_address: user.email_address,
            first_name: user.first_name,
            last_name: user.last_name,
        },
        config.jwt.secret,
        config.jwt.alg as "HS256",
    );

    return c.json({ token });
};

// Model with methods to update 2FA status
class Model {
    constructor(private db: any) {}

    async updateUser2FAStatus(userId: number, status: "true" | "false") {
        await this.db.update(users)
            .set({ two_fa: status })
            .where(eq(users.id, userId));
    }

    async get(table: any, condition: any) {
        return this.db.select()
            .from(table)
            .where(condition)
            .limit(1)  // Ensure only one result is returned
            .then((rows: any[]) => rows[0]);
    }
}

export const FA = { Post, Enable2FA, Disable2FA };
