import { config } from "@config";
import { exception } from "./error";

export const fetch_ = async <T>(path: string, payload?: object) => {
	try {
		
		const req = await fetch(`${config.label.url}${path}`, {
			method: "POST",
			headers: config.label.headers,
			body: payload ? JSON.stringify(payload) : undefined,
		});
		const res = (await req.json()) as { message: string; payload: T; pager: unknown };

		if (!req.ok) throw exception({ message: res.message, code: 7009 });

		return res;
	} catch (error) {
		throw error;
	}
};
