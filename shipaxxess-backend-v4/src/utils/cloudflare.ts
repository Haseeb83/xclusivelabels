import { config } from "@config";

export const cloudflare = async (url: string, params?: { method: string; body?: object }) => {
	return await fetch(`https://api.cloudflare.com/client/v4${url}`, {
		method: params?.method ?? "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Auth-Email": config.cloudflare.api_email,
			"X-Auth-Key": config.cloudflare.api_key,
		},
		body: params?.body ? JSON.stringify(params.body) : undefined,
	});
};
