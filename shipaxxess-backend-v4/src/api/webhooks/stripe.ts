import { config } from "@config";
import { Model } from "@lib/model";
import { payments } from "@schemas/payments";
import { subscriptions } from "@schemas/subscriptions";
import { users } from "@schemas/users";
import { log } from "@utils/log";
import { mail } from "@utils/mail";
import { INOtifcation, SaveNotifcaiton } from "@utils/notification";
import { sendPushNotification } from "@utils/push";
import { getSettings } from "@utils/settings";
import { and, eq } from "drizzle-orm";
import { Context } from "hono";
import Stripe from "stripe";
import { v4 } from "uuid";

export const StripeWebhook = async (c: Context<App>) => {
	try {
		const settings = await getSettings(c.env.DB);
		

		if (!settings["stripe_key"] || !settings["stripe_secret"] || !settings["stripe_webhook_secret"]) {
			throw new Error("Can not initialize Stripe without STRIPE_KEY");
		}

		const stripe = new Stripe(settings["stripe_secret"], {
			httpClient: Stripe.createFetchHttpClient(),
		});

		const body = await c.req.raw.text();
	
	
		const sig = c.req.header("stripe-signature");
		if (!sig) throw new Error("No signature");

		const event = await stripe.webhooks.constructEventAsync(body, sig, settings["stripe_webhook_secret"]);
		let user;
		const model = new Model(c.env.DB);
		let user_id
		let topup
		let topup_uuid
		let data

		switch (event.type) {
			case "checkout.session.completed":
				console.log("seesion complete")
				const { metadata } = event.data.object;

				if (!metadata) throw new Error("No metadata");
				topup_uuid = metadata.topup_uuid;
				user_id = parseInt(metadata.user_id);

				user = await model.get(users, eq(users.id, user_id));
				if (!user) throw new Error("User not found");
				topup = await model.get(payments, and(eq(payments.uuid, topup_uuid), eq(payments.user_id, user_id)));
				if (!topup) throw new Error("Topup not found");
				await model.update(
					users,
					{
						current_balance: user.current_balance + topup.credit,
					},
					eq(users.id, user_id),
				);
				await model.update(
					payments,
					{
						status: "confirmed",
					},
					eq(payments.uuid, topup_uuid),
				);

				log(`Stripe webhook: ${user.email_address} topped up ${topup.credit} credits`);

				const notification: INOtifcation = {
					user_id: user_id,
					title: "Top-up Successful",
					description: `Your account has been successfully topped up with ${topup.credit} credits.`,
					uuid: v4(),
				}
				await SaveNotifcaiton(c.env.DB, notification);
				c.executionCtx.waitUntil(
					mail(c.env.DB, {
						to: user.email_address,
						subject: `Top-up Successful`,
						html: `
							<p>Hi ${user.first_name},</p>
							<p>Your account has been successfully topped up with ${topup.credit} credits.</p>
							<p>Thank you for using ${config.app.name}.</p>
							<p>Best Regards</p>
							<p>The ${config.app.name} Team</p>
							<p>${config.app.support}</p>`
					})
				);
				// the token must be recently added
				const token = await model.get(subscriptions, and(eq(subscriptions.user_id, user_id), eq(subscriptions.is_active, true)));
				console.log("token", token)
				if (token) {
					const message = {
						title: `Top-up Successful`,
						body: `Your account has been successfully topped up with ${topup.credit} credits.`,
					}
					await sendPushNotification(token.token, message)

				}
				return c.json({ success: true });



			case "checkout.session.async_payment_failed":
				data = event.data.object;
				if (!data.metadata) throw new Error("No metadata");
				topup_uuid = data.metadata.topup_uuid;
				user_id = parseInt(data.metadata.user_id);
				user = await model.get(users, eq(users.id, user_id));
				if (!user) throw new Error("User not found");

				topup = await model.get(payments, and(eq(payments.uuid, topup_uuid), eq(payments.user_id, user_id)));
				if (!topup) throw new Error("Topup not found");

				await model.update(
					payments,
					{
						status: "failed",
					},
					eq(payments.uuid, topup_uuid),
				);

				log(`Stripe webhook: ${user.email_address} failed to top up ${topup.credit} credits`);

				c.executionCtx.waitUntil(
					mail(c.env.DB, {
						to: user.email_address,
						subject: `Top-up Failed`,
						html: `
								<p>Hi ${user.first_name},</p>
								<p>We're sorry to inform you that your recent attempt to top up ${topup.credit} credits failed.</p>
								<p>Please ensure that you have sufficient funds in your account and try again.</p>
								<p>If you continue to experience issues, please contact support at ${config.app.support}.</p>
								<p>Thank you for using ${config.app.name}.</p>
								<p>Best regards,</p>
								<p>The ${config.app.name} Team</p>`
					})
				);

			case "charge.failed":
				break
			case "payment_intent.succeeded":

				const { charges } = event.data.object
				console.log("event.data.objec", event.data.object)




				return c.json({ success: true });



			default:
				return c.json({ success: true });



		}
	} catch (err) {
		log(`Stripe webhook error: ${(err as Error).message}`);
		return c.json({ error: (err as Error).message }, 500);
	}
};

