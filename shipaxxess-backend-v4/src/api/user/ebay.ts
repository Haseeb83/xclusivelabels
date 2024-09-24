import { Model } from "@lib/model";
import { Ebay } from "@lib/stores/ebay";
import { stores } from "@schemas/stores";
import { exception } from "@utils/error";
import { eq } from "drizzle-orm";
import { Context } from "hono";
import { v4 } from "uuid";

const Init = async (c: Context<App>) => {
	const api = new Ebay();
	return c.json({ url: api.redirect() });
};

const Callback = async (c: Context<App>) => {
	const api = new Ebay();
	const code = c.req.query("code");

	if (!code) throw exception({ code: 404, message: "No code provided" });

	const { access_token, refresh_token, expires_in } = await api.exchangeCodeForToken(code);

	const model = new Model(c.env.DB);

	const [insert] = await model.insert(stores, {
		store_name: "Ebay Store",
		user_id: c.get("jwtPayload").id,
		uuid: v4(),
		type: "Ebay",
		eb_access_token: access_token,
		eb_refresh_token: refresh_token,
		eb_expires_in: expires_in,
	});

	return c.json({ success: true, id: insert.id });
};

const FetchOrders = async (c: Context<App>) => {
	const store_id = c.req.query("id");
	if (!store_id) throw exception({ code: 404, message: "No store id provided" });

	const model = new Model(c.env.DB);

	const store = await model.get(stores, eq(stores.id, parseInt(store_id)));
	if (!store) throw exception({ code: 404, message: "Store not found" });
	if (!store.eb_access_token) throw exception({ code: 404, message: "Store not found" });

	const api = new Ebay();

	try {
		const orders = await api.getOrders(store.eb_access_token, 200);
		return c.json(orders);
	} catch (err) {
		const token = await api.refreshTokenToAccessToken(store.eb_refresh_token!);

		await model.update(
			stores,
			{
				eb_access_token: token.access_token,
				eb_refresh_token: store.eb_refresh_token,
				eb_expires_in: token.expires_in,
			},
			eq(stores.id, parseInt(store_id)),
		);

		const orders = await api.getOrders(token.access_token, 200);
		return c.json(orders);
	}
};

const StoreAsBatch = async (c: Context<App>) => {
	return c.json({ success: true });
};

export const EbayUser = { Init, Callback, FetchOrders, StoreAsBatch };
