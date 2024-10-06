import { config } from "@config";

import { subscriptions } from "@schemas/subscriptions";
import { users } from "@schemas/users";
import { INOtifcation, SaveNotifcaiton } from "@utils/notification";
import { sendPushNotification } from "@utils/push";
import { mail } from "@utils/mail";
import { v4 } from "uuid";
import { and, eq } from "drizzle-orm";
import { Context } from "hono";
import { Model } from "@lib/model";
import { exception } from "@utils/error";
import { drizzle } from "drizzle-orm/d1";

const PostGlobalNotice = async (c: Context<App>) => {
	const body = await c.req.json();
	const model = new Model(c.env.DB);
	const { title, description, box_color } = body;

	// Fetch all users
	const allUsers = await model.all(users);

	// Send email and notification to each user
	for (const user of allUsers) {
		// Sending email to each user
		c.executionCtx.waitUntil(
			mail(c.env.DB, {
				to: user.email_address,
				subject: title || "Global Notice",
				html: description || "<p>This is a global notification</p>",
			}),
		);

		// Create notification object
		const notification: INOtifcation = {
			title: title || "Global Notification",
			description: description || "You have received a new global notification.",
			user_id: user.id,
			uuid: v4(),
			box_color: box_color || "white",
		};

		// Save notification in the database
		await SaveNotifcaiton(c.env.DB, notification);


		const devicetoken = await drizzle(c.env.DB).select().from(subscriptions).where(eq(subscriptions.user_id, user.id)).all()

		if (devicetoken.length > 0) {
			devicetoken.forEach(async (token) => {
				await sendPushNotification(token.token, {
					title: title || "Global Notification",
					body: description || "You have received a new global notification.",
					icon: "/favicon.ico",
					data: { url: `${config.app.url}/notifications` },
				});
			})
	
		}






			
		
	}

	return c.json({ success: true });
};

const PostSingleNotification = async (c: Context<App>) => {
	const body = await c.req.json();
	const model = new Model(c.env.DB);
	const { title, description, box_color, user_id } = body;

	// Fetch all users
	const user = await model.get(users, eq(users.id, Number(user_id)));

	if (!user) throw exception({ message: "user not found", code: 204 });
	// Send email and notification to each user

	// Sending email to each user
	c.executionCtx.waitUntil(
		mail(c.env.DB, {
			to: user.email_address,
			subject: title || "Notice",
			html: description || "<p>This is a global notification</p>",
		}),
	);

	// Create notification object
	const notification: INOtifcation = {
		title: title || " Notification",
		description: description || "You have received a new  notification.",
		user_id: user.id,
		uuid: v4(),
		box_color: box_color || "white",
	};

	// Save notification in the database
	await SaveNotifcaiton(c.env.DB, notification);

	// Fetch active device tokens for push notifications
	const activeSubscriptions = await model.get(
		subscriptions,
		and(eq(subscriptions.user_id, user.id), eq(subscriptions.is_active, true)),
	);

	// Send push notification if user has active subscriptions

	if(activeSubscriptions?.token){
        await sendPushNotification(activeSubscriptions!.token, {
            title: title || "Global Notification",
            body: description || "You have received a new global notification.",
            icon: "/favicon.ico",
        });
    }

	return c.json({ success: true });
};

const NoticeAdmin = { PostGlobalNotice, PostSingleNotification };

export { NoticeAdmin };