import { Model } from "@lib/model";
import { payments } from "@schemas/payments";
import { users } from "@schemas/users";
import { Payment } from "@shipaxxess/shipaxxess-zod-v4";
import { exception } from "@utils/error";
import { eq, ne } from "drizzle-orm";
import { Context } from "hono";

// Existing GetAll, Accept, Reject functions

const GetAll = async (c: Context<App>) => {
	const model = new Model(c.env.DB);

	const pt = await model.all(payments, ne(payments.gateway, "payment"));

	return c.json(pt);
};

const Accept = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Payment.ACCEPTSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	const payment = await model.get(payments, eq(payments.id, parse.payment_id));
	if (!payment) throw exception({ message: "Payment not found", code: 404 });

	await model.update(
		payments,
		{
			status: "confirmed",
		},
		eq(payments.id, parse.payment_id),
	);

	await model.update(
		users,
		{
			current_balance: payment.new_balance,
		},
		eq(users.id, payment.user_id),
	);

	return c.json({ success: true });
};

const Reject = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Payment.REJECTSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	const payment = await model.get(payments, eq(payments.id, parse.payment_id));
	if (!payment) throw exception({ message: "Payment not found", code: 404 });

	await model.update(
		payments,
		{
			status: "rejected",
			new_balance: payment.current_balance,
		},
		eq(payments.id, parse.payment_id),
	);

	return c.json({ success: true });
};

// New GetReceipt function to get a payment receipt
const GetReceipt = async (c: Context<App>) => {
	const paymentId = c.req.param('id'); // Get payment ID from request parameters

	if (!paymentId) {
		throw exception({ message: "Payment ID is required", code: 400 });
	}

	const model = new Model(c.env.DB);

	const payment = await model.get(payments, eq(payments.id, paymentId));
	if (!payment) {
		throw exception({ message: "Payment not found", code: 404 });
	}

	// Assuming you want to return the payment details as the receipt
	return c.json(payment);
};

// Exporting the updated PaymentsAdmin object with GetReceipt
const PaymentsAdmin = { GetAll, Accept, Reject, GetReceipt };

export { PaymentsAdmin };

