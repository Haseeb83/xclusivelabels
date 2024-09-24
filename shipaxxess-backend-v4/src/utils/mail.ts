import { config } from "@config";
import { log } from "./log";
import { getSettings } from "./settings";

export const mail = async (db: D1Database, payload: Payload) => {
	try {
		const settings = await getSettings(db);
	
		if (!settings["email_smtp_host"]) throw new Error("SMTP host not set");
		if (!settings["email_smtp_port"]) throw new Error("SMTP port not set");
		if (!settings["email_smtp_user"]) throw new Error("SMTP user not set");
		if (!settings["email_smtp_password"]) throw new Error("SMTP password not set");
		if (!settings["email_from_name"]) throw new Error("From name not set");
		if (!settings["email_from_address"]) throw new Error("From address not set");
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(settings["email_from_address"])) {
		  throw new Error(`Invalid email format: ${settings["email_from_address"]}`);
		}
	

		const req = await fetch(config.mail, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				payload: {
					from: settings["email_from_address"],
					from_name: settings["email_from_name"],
					to: payload.to,
					subject: payload.subject,
					message: payload.html,
				},
				smtp: {
					host: settings["email_smtp_host"],
					port: Number(settings["email_smtp_port"]),
					user: settings["email_smtp_user"],
					pass: settings["email_smtp_password"],
				},
			}),
		});

		const res = (await req.json()) as { error: string; id: string };

		if (!req.ok) throw new Error(res.error);

		log(`Email sent: ${res.id}`);
	} catch (error) {
		log(`Error sending email: ${(error as Error).message}`);
	}
};
function fetch(mail: string, arg1: { method: string; headers: { "Content-Type": string; }; body: string; }) {
	throw new Error("Function not implemented.");
}

