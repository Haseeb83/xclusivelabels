import { config } from "@config";
import { Model } from "@lib/model";
import { chats } from "@schemas/chats";
import { subscriptions } from "@schemas/subscriptions";
import { tickets } from "@schemas/tickets";
import { users } from "@schemas/users";
import { Chats, Id } from "@shipaxxess/shipaxxess-zod-v4";
import { exception } from "@utils/error";
import { mail } from "@utils/mail";
import { INOtifcation, SaveNotifcaiton } from "@utils/notification";
import { sendPushNotification } from "@utils/push";
import { and, eq } from "drizzle-orm";
import { Context } from "hono";
import { v4 } from "uuid";

const GetAll = async (c: Context<App>) => {
	const model = new Model(c.env.DB);

	const tk = await model.all(tickets);
	console.log(tk);

	return c.json(tk);
};

const Get = async (c: Context<App, "/:uuid">) => {
	const ticket_uuid = c.req.param("uuid");

	const model = new Model(c.env.DB);

	const tk = await model.get(tickets, eq(tickets.uuid, ticket_uuid));
	if (!tk) throw exception({ message: "Ticket not found", code: 404 });

	const cht = await model.all(chats, eq(chats.ticket_uuid, ticket_uuid));

	return c.json({ ticket: tk, chats: cht });
};

const PostMessage = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Chats.IDZODSCHEMA.parse(body);
	console.log("parse", parse);

	const model = new Model(c.env.DB);

	const tk = await model.get(tickets, eq(tickets.id, parse.id));

	if (!tk) throw exception({ message: "Ticket not found", code: 404 });

	const user = await model.get(users, eq(users.id, c.get("jwtPayload").id));
	if (!user) throw exception({ message: "User not found", code: 5564 });

	const [cht] = await model.insert(chats, {
		message: parse.message,
		message_author: `${user.first_name} ${user.last_name}`,
		ticket_uuid: tk.uuid,
		message_profile: `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`,
		user_id: c.get("jwtPayload").id,
		uuid: v4(),
	});

	const { user_id } = tk;
	// find tikcer owner
	const ticketOwner = await model.get(users, eq(users.id, user_id));
	if (!ticketOwner) throw exception({ message: "Ticket owner not found", code: 5564 });

	let emailBody = ``;
	let emailSubject = ``;
	emailBody = `	<p>Hi ${ticketOwner.first_name},</p>
<p>${user.first_name} ${user.last_name} has replied to your ticket</p>
<p>Message: ${parse.message}</p>

<p>Thanks</p>
<p>The ${config.app.name} Team</p>

`;
	emailSubject = `New message from Support on your ticket `;

	c.executionCtx.waitUntil(
		mail(c.env.DB, {
			to: ticketOwner.email_address,
			subject: emailSubject,
			html: emailBody,
		}),
	);

	const notifcaiton: INOtifcation = {
		title: "Reply to ticket",
		description: `${user.first_name} ${user.last_name} has replied to your ticket`,
		user_id: user_id,
		uuid: v4(),
		box_color:"white",
	};

	await SaveNotifcaiton(c.env.DB, notifcaiton);
	const devicetoken = await model.all(
		subscriptions,
		and(eq(subscriptions.user_id, ticketOwner.id), eq(subscriptions.is_active, true)),
	);
	if (devicetoken.length > 0) {
		devicetoken.forEach(async (token) => {
			await sendPushNotification(token.token, {
				title: "Reply to ticket",
				body: `${user.first_name} ${user.last_name} has replied to your ticket`,
				icon: "/favicon.ico",
				data: { url: `${config.app.loclhost}/tickets/${tk.uuid}` },
			});
		});
	}

	return c.json(cht);
};

const Close = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Id.ZODSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	const tk = await model.get(tickets, eq(tickets.id, parse.id));
	if (!tk) throw exception({ message: "Ticket not found", code: 404 });

	await model.update(
		tickets,
		{
			status: "closed",
		},
		eq(tickets.id, parse.id),
	);

	// send email to ticket owner
	const { user_id } = tk;
	// find tikcer owner
	const ticketOwner = await model.get(users, eq(users.id, user_id));
	if (!ticketOwner) throw exception({ message: "Ticket owner not found", code: 5564 });

	let emailBody = ``;
	let emailSubject = ``;
	emailBody = `	<p>Hi ${ticketOwner.first_name},</p>
<p>Your ticket has been closed</p>
<p>Thanks</p>
<p>The ${config.app.name} Team</p>

`;
	emailSubject = `Ticket closed by Support`;

	c.executionCtx.waitUntil(
		mail(c.env.DB, {
			to: ticketOwner.email_address,
			subject: emailSubject,
			html: emailBody,
		}),
	);
	// save notification for ticket owner
	const notifcaiton: INOtifcation = {
		title: "Ticket closed",
		description: `Your ticket has been closed`,
		user_id: user_id,
		uuid: v4(),
		box_color:"white",
	};

	await SaveNotifcaiton(c.env.DB, notifcaiton);
	const devicetoken = await model.all(
		subscriptions,
		and(eq(subscriptions.user_id, ticketOwner.id), eq(subscriptions.is_active, true)),
	);
	if (devicetoken.length > 0) {
		devicetoken.forEach(async (token) => {
			await sendPushNotification(token.token, {
				title: "Ticket closed",
				body: `Your ticket has been closed`,
				icon: "/favicon.ico",
				data: { url: `${config.app.loclhost}/tickets/${tk.uuid}` },
			});
		});
	}

	return c.json({ success: true });
};

const TicketsAdmin = { Get, GetAll, PostMessage, Close };

export { TicketsAdmin };