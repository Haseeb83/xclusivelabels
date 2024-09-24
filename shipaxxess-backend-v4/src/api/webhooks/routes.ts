import { Hono } from "hono";
import { CoinbaseWebhook } from "./coinbase";
import { StripeWebhook } from "./stripe";

const webhook = new Hono<App>();

webhook.post("/stripe", StripeWebhook);
webhook.post("/coinbase", CoinbaseWebhook);

export { webhook };
