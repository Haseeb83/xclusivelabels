import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

export const error = (err: Error, c: Context<App>) => {
	if (err instanceof ZodError) {
		if (err.issues[0].path[2]) {
			return c.json(
				{
					message: `${err.issues[0].path[2]} is ${err.issues[0].message} on row ${
						parseInt(err.issues[0].path[1] as string) + 1
					}`,
				},
				500,
			);
		}

		if (err.issues[0].path[0]) {
			return c.json(
				{
					message: `${err.issues[0].path[0]} is ${err.issues[0].message}`,
				},
				500,
			);
		}
	}

	if (err instanceof HTTPException) {
		if (err.message === "") {
			return c.json({ message: "Unauthorized", code: 401 }, 401);
		}

		return c.json({ message: err.message, code: 500 }, 500);
	}

	try {
		return c.json(JSON.parse(err.message), 500);
	} catch (error) {
		return c.json({ message: err.message }, 500);
	}
};
