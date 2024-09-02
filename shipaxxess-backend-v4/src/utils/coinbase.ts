import { config } from "@config";

type PayloadProps = { amount: number; topup_uuid: string; user_id: number };

export const coinbaseCharge = async (secret: string, payload: PayloadProps) => {
	const req = await fetch(`https://api.commerce.coinbase.com/charges`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-CC-Api-Key": secret,
			"X-CC-Version": "2018-03-22",
		},
		body: JSON.stringify({
			name: config.app.name,
			description: `Topup for $${payload.amount}`,
			local_price: {
				amount: payload.amount,
				currency: "USD",
			},
			pricing_type: "fixed_price",
			metadata: {
				topup_uuid: payload.topup_uuid,
				user_id: payload.user_id,
			},
			redirect_url: `${config.app.url}/payments?payment=success&method=crypto`,
			cancel_url: `${config.app.url}/payments?payment=canceled&method=crypto`,
		}),
	});

	const res = (await req.json()) as {
		error: { message: string };
		data: null | { hosted_url: string };
	};

	if (!req.ok) throw new Error(res.error.message);
	if (!res.data) throw new Error("data is null");

	return res.data;
};
