import { batchs } from "@schemas/batchs";
import { payments } from "@schemas/payments";
import { tickets } from "@schemas/tickets";

import { users } from "@schemas/users";
import { and, count, desc, eq, gt, not, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import nodemailer from "nodemailer";

interface Order {
	id: number;
	created_at: string;
}
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Configure Nodemailer
const transporter = nodemailer.createTransport({
	service: 'gmail', // or another service
	auth: {
		user: 'pwz2k@hotmail.com', //email address
		pass: 'super' //email password
	}
});

// Function to send email
const sendEmail = async (subject: string, text: string) => {
	try {
		await transporter.sendMail({
			from: 'pwz2k@hotmail.com',
			to: 'pwz2k@hotmail.com', // Replace it with youradmin email if you want to change
			subject: subject,
			text: text
		});
		console.log('Email sent successfully');
	} catch (error) {
		console.error('Error sending email:', error);
	}
};

export const Get = async (c: Context<App>) => {
	const db = drizzle(c.env.DB);

	const totalUsers = await db.select({
		count: count()
	}).from(users);

	const OpenTicket = await db.select({
		count: count()
	}).from(tickets).where(eq(tickets.status, "active"));

	const peakOrderTime = await db.select({
		timeFrame: sql`strftime('%Y-%m-%d %H', created_at)`,
		orderCount: count()
	})
		.from(batchs)
		.groupBy(sql`strftime('%Y-%m-%d %H', created_at)`)
		.orderBy(desc(count()))
		.limit(24);

	const formattedPeakOrderTime = peakOrderTime.map((order: any) => {
		const parts = order.timeFrame.split(' ');
		const datePart = parts[0];
		let timePart = parts[1];
		const [hours, minutes] = timePart.split(':');
		return {
			hours: `${hours}:00`,
			orders: order.orderCount
		};
	});

	const totalAmountByGateway = await db.select({
		name: payments.gateway,
		value: sql`SUM(${payments.credit})`
	}).from(payments)
		.where(and(not(eq(payments.gateway, "Label")), not(eq(payments.gateway, "Refund"))))
		.groupBy(payments.gateway)
		.orderBy(payments.gateway);

	const refundedOrders = await db.select({
		month: sql`strftime('%m', created_at)`,
		orders: count()
	}).from(batchs)
		.groupBy(sql`strftime('%m', created_at)`)
		.orderBy(desc(count()));

	const formattedRefundedOrders = refundedOrders.map((order: any) => {
		const month = monthNames[parseInt(order.month) - 1];
		return {
			month,
			orders: order.orders
		};
	});

	const refundsByCarrier = await db.select({
		name: batchs.type,
		value: count()
	}).from(batchs)
		.groupBy(batchs.type)
		.orderBy(desc(count()));

	const topReferralUsers = await db.select({
		id: users.id,
		name: users.first_name,
		fullName: users.last_name,
		email: users.email_address,
		timeZone: users.timezone,
		referrals: count(users.refer_from),
		joined: users.created_at,
		status: users.email_verified,
		uuid: users.uuid,
	}).from(users).where(gt(users, 0)).execute();

	const totalEarnings = await db.select({
		totalEarnings: sql`SUM(${payments.credit})`
	}).from(payments)
		.where(not(eq(payments.gateway, "Refund")))
		.execute();
	const totalRefunds = await db.select({
		totalRefunds: sql`SUM(${payments.credit})`
	}).from(payments)
		.where(eq(payments.gateway, "Refund"))
		.execute();

	const earningRefunds = [{ name: "Total Earnings", value: totalEarnings[0].totalEarnings }, { name: "Refunds", value: totalRefunds[0].totalRefunds }];

	const profits = await db.select({
		month: sql`strftime('%m', created_at)`,
		profit: sql`SUM(${payments.credit}) - (SELECT SUM(${payments.credit}) FROM ${payments} WHERE ${payments.gateway} = "Refund") - (SELECT SUM(${payments.credit}) FROM ${payments} WHERE ${payments.gateway} = "Label")`
	}).from(payments)
		.groupBy(sql`strftime('%m', created_at)`)
		.orderBy(desc(count()));

	const profitByMonth = profits.map((profit: any) => {
		const month = monthNames[parseInt(profit.month) - 1];
		return {
			month,
			profit: `$ ${profit.profit}`
		};
	});

	const payload = {
		statisticCard: {
			totalUsers: totalUsers[0].count,
			newlyRegisteredUsers: 4,
			openTickets: OpenTicket[0].count,
			refundsRequests: 200,
		},
		earningRefunds: earningRefunds,
		revenueByCategory: [{ name: "Category A", value: 400 }, { name: "Category B", value: 300 }, { name: "Category C", value: 300 }],
		monthlyRevenue: [{ name: "January", value: 400 }, { name: "February", value: 300 }, { name: "March", value: 300 }, { name: "April", value: 200 }, { name: "May", value: 100 }, { name: "June", value: 50 }, { name: "July", value: 40 }, { name: "August", value: 30 }, { name: "September", value: 20 }, { name: "October", value: 10 }, { name: "November", value: 5 }, { name: "December", value: 8 }],
		topSellingProducts: [{ name: "Product A", value: 400 }, { name: "Product B", value: 300 }, { name: "Product C", value: 300 }, { name: "Product D", value: 200 }],
		shippingCategories: [{ name: "Electronics", value: 400 }, { name: "Fashion", value: 300 }, { name: "Home & Garden", value: 300 }, { name: "Sports", value: 200 }],
		peakOrderTime: formattedPeakOrderTime,
		popularStates: [{ state: 'California', orders: 400 }, { state: 'Texas', orders: 300 }, { state: 'New York', orders: 200 }, { state: 'Florida', orders: 100 }, { state: 'Illinois', orders: 50 }, { state: 'Pennsylvania', orders: 40 }, { state: 'Ohio', orders: 30 }, { state: 'Georgia', orders: 20 }, { state: 'North Carolina', orders: 10 }, { state: 'Michigan', orders: 5 }, { state: 'New Jersey', orders: 8 }],
		referralUsers: topReferralUsers,
		paymentMethods: totalAmountByGateway,
		profits: profitByMonth,
		refundedOrders: formattedRefundedOrders,
		refundsByCarrier: refundsByCarrier
	};

	// Notify admin when a support ticket is created or replied to
	const supportTickets = await db.select({
		id: tickets.id,
		created_at: tickets.created_at,
		updated_at: tickets.updated_at,
		status: tickets.status,
	}).from(tickets).where(eq(tickets.status, 'created'), eq(tickets.status, 'replied'));

	for (const ticket of supportTickets) {
		const subject = `Support Ticket ${ticket.status} - ID: ${ticket.id}`;
		const text = `A support ticket with ID ${ticket.id} has been ${ticket.status}. Created at: ${ticket.created_at}, Last updated at: ${ticket.updated_at}.`;
		await sendEmail(subject, text);
	}

	// Return the payload as a JSON response
	return c.json(payload);
};

export const DashboardAdmin = { Get };
