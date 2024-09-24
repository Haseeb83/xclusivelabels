import { payments } from "@schemas/payments";
import { users } from "@schemas/users";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const Get = async (c: Context<App>) => {
	const db = drizzle(c.env.DB);
	const userId = c.get("jwtPayload").id;
	const user = await db.select().from(users).where(eq(users.id, userId));
	const logginUser = user[0];
	const transcationHistory = await db.select({
		transactionId: payments.id,
		amount: payments.credit,
		balance: payments.current_balance,
		status: payments.status,
		date: payments.created_at,
		type: payments.gateway,

	}).from(payments).where(eq(payments.user_id, userId));



	const payload = {
		staticsCard: {
			currnetBalance: logginUser.current_balance,
			totalSpend: logginUser.total_spent,
			totalRefund: logginUser.total_refund,
			referlBalance: logginUser.credit_for_refer_from_user,
			totalShipingCost: 0,
			carrierAdjustment: 0,
			pendingRefund: 0,
			avgDomesticShippingCost: 0,
			avgInternationalShippingCost: 0,
			newShipment: 0,
			deliveryIssues: 0,
		},
		totalPayment: 0,
		avergeCost: 0,
		totalShipment: 0,
		serivces: 0,
		recipentZones: 0,
		topstates: {
			state: "",
			shipment: 0,
		},
		topInternatonal: {
			country: "",
			shipment: 0,
		},
		transcationHistory: transcationHistory,


	}

	return c.json(payload);
};

export const DashboardUser = { Get }; 