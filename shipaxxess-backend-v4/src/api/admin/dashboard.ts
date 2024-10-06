// import { batchs } from "@schemas/batchs";
// import { labels } from "@schemas/labels";
// import { payments } from "@schemas/payments";
// import { refunds } from "@schemas/refunds";
// import { tickets } from "@schemas/tickets";

// import { users } from "@schemas/users";
// import { and, count, desc, eq, gt, not, sql } from "drizzle-orm";
// import { drizzle, } from "drizzle-orm/d1";
// import { Context } from "hono";
// interface Order {
// 	id: number;
// 	created_at: string;
// }
// const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
// 	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// export const Get = async (c: Context<App>) => {
// 	const db = drizzle(c.env.DB);
// 	const totalUsers = await db.select({
// 		count: count()
// 	}).from(users);

// 	const OpenTicket = await db.select({
// 		count: count()
// 	}).from(tickets).where(eq(tickets.status, "active"));
// 	// calculate the peak order time from the batchs table using batch table
// 	const peakOrderTime = await db.select({
// 		timeFrame: sql`strftime('%Y-%m-%d %H', created_at)`, // Format the datetime to 'YYYY-MM-DD HH'
// 		orderCount: count()
// 	})
// 		.from(batchs)
// 		// .where(eq(batchs.status_label, "active")) // Assuming 'active' batches are what you're interested in
// 		.groupBy(sql`strftime('%Y-%m-%d %H', created_at)`)
// 		.orderBy(desc(count()))
// 		.limit(24)
// 	const formattedPeakOrderTime = peakOrderTime.map((order: any) => {
// 		const parts = order.timeFrame.split(' ');
// 		const datePart = parts[0];
// 		let timePart = parts[1];
// 		const [hours, minutes] = timePart.split(':');
// 		return {

// 			hours: `${hours}:00`,
// 			orders: order.orderCount
// 		}

// 	})
// 	// compute paymentMethods and each method total value using payments table
// 	const totalAmountByGateway = await db.select({
// 		name: payments.gateway,
// 		// add $ sign to the value to show that it is a currency
// 		value: sql`SUM(${payments.credit})`

// 	}).from(payments)
// 		.where(and(not(eq(payments.gateway, "Label")), not(eq(payments.gateway, "Refund")))) // Exclude third-party API payments and refunds
// 		.groupBy(payments.gateway) // Group by gateway only, not by user_id
// 		.orderBy(payments.gateway);



// 	// compute refunder orders using batchs table by each month by name
// 	const refundedOrders = await db.select({
// 		month: sql`strftime('%m', created_at)`,
// 		orders: count()
// 	}).from(batchs)
// 		.groupBy(sql`strftime('%m', created_at)`)
// 		.orderBy(desc(count()));

// 	const formattedRefundedOrders = refundedOrders.map((order: any) => {
// 		const month = monthNames[parseInt(order.month) - 1];
// 		return {
// 			month,
// 			orders: order.orders
// 		}
// 	})




// 	// compute  refundsByCarrier using batchs table by each carrier
// 	const refundsByCarrier = await db.select({
// 		name: batchs.type,
// 		value: count()
// 	}).from(batchs)
// 		.groupBy(batchs.type)
// 		.orderBy(desc(count()));

// 	// return the top 10 referralUsers that referred the most users if user not refer any it refer_from is null
// 	const topReferralUsers = await db.select({
// 		id: users.id,
// 		name: users.first_name,
// 		fullName: users.last_name,
// 		email: users.email_address,
// 		timeZone: users.timezone,
// 		referrals: count(users.refer_from),
// 		joined: users.created_at,
// 		status: users.email_verified,
// 		uuid: users.uuid,

// 	}).from(users).where(gt(users, 0)).execute();

// 	const totalEarnings = await db.select({
// 		totalEarnings: sql`SUM(${payments.credit})`
// 	}).from(payments)
// 		.where(not(eq(payments.gateway, "Refund")))
// 		.execute();
// 	const totalRefunds = await db.select({
// 		totalRefunds: sql`SUM(${payments.credit})`
// 	}).from(payments)
// 		.where(eq(payments.gateway, "Refund"))
// 		.execute();

// 	const earningRefunds = [{ name: "Total Earnings", value: totalEarnings[0].totalEarnings }, { name: "Refunds", value: totalRefunds[0].totalRefunds }];

// 	// compute the profit by each month using the payments table in which gateway Label means we pay expenses and Refund means we get the refund and other gateways are the payments user made
// 	const profitByMonth = await db.select({
// 		month: sql`strftime('%m', created_at)`,
// 		profit: sql`SUM(${payments.credit})`
// 	}).from(payments)
// 		.where(not(eq(payments.gateway, "Refund")))
// 		.groupBy(sql`strftime('%m', created_at)`)
// 		.orderBy(desc(count()));



// 	// format month to show the month name  with 12 months
// 	const profitByMonthFormatted = profitByMonth.map((profit: any) => {
// 		const month = monthNames[parseInt(profit.month) - 1];
// 		return {
// 			month,
// 			profit: profit.profit
// 		}
// 	})

// 	console.log("profit", profitByMonthFormatted)


// 	const allLabels = await drizzle(c.env.DB).select().from(labels).groupBy(labels.type_label).execute();

// 	const revenueByCategory = allLabels.map((label: any) => {
// 		return {
// 			name: label.type_value,
// 			value: label.cost_user
// 		}
// 	})

// 	const refundsRequests = await db.select({
// 		month: sql`strftime('%m', created_at)`,
// 		refunds: count()
// 	}).from(refunds)
// 		.groupBy(sql`strftime('%m', created_at)`)
// 		.orderBy(desc(count()));
// 	const formattedRefundsRequests = refundsRequests.map((refund: any) => {
// 		const month = monthNames[parseInt(refund.month) - 1];
// 		return {
// 			month,
// 			orders: refund.refunds
// 		}
// 	})
// 	// add the data of other months that are not in the refundsRequests if the month have no data then add 0 orders
// 	const allMonths = monthNames.map((month, index) => {
// 		const found = formattedRefundsRequests.find((refund: any) => refund.month === month);
// 		if (found) return found;
// 		return { month, orders: 0 }
// 	})

// 	// compute the total revenue by each month from the labels table and batchs table
// 	const labelsRevenue = await db.select({
// 		month: sql`strftime('%m', created_at)`,
// 		revenue: sql`SUM(${labels.cost_user})`
// 	}).from(labels)
// 		.groupBy(sql`strftime('%m', created_at)`)
// 		.orderBy(desc(count()));
// 	const batchsRevenue = await db.select({
// 		month: sql`strftime('%m', created_at)`,
// 		revenue: sql`SUM(${batchs.cost_user})`
// 	}).from(batchs)
// 		.groupBy(sql`strftime('%m', created_at)`)
// 		.orderBy(desc(count()));
// 	// merge the labelsRevenue and batchsRevenue to get the total revenue by each month
// 	const revenueByMonth = labelsRevenue.map((label: any) => {
// 		const month = monthNames[parseInt(label.month) - 1];
// 		return {
// 			month,
// 			revenue: label.revenue
// 		}
// 	})
// 	const batchsRevenueByMonth = batchsRevenue.map((batch: any) => {
// 		const month = monthNames[parseInt(batch.month) - 1];
// 		return {
// 			month,
// 			revenue: batch.revenue
// 		}
// 	})
// 	const mergedRevenue = revenueByMonth.map((revenue: any, index) => {
// 		return {
// 			month: revenue.month,
// 			revenue: revenue.revenue + batchsRevenueByMonth[index].revenue
// 		}
// 	})

// 	// format the mergedRevenue to show the month for 12 months 
// 	const formattedRevenue = monthNames.map((month, index) => {
// 		const found = mergedRevenue.find((revenue: any) => revenue.month === month);
// 		if (found) return found;
// 		return { month, revenue: 0 }
// 	})
// 	const allMonthsProfit = monthNames.map((month, index) => {
// 		const found = profitByMonthFormatted.find((profit: any) => profit.month === month);
// 		if (found) return found;
// 		return { month, profit: 0 }
// 	})

// 	// find all the labls and batch where the country is United states
// 	const domesticLabels = await db.select().from(labels).where(eq(labels.sender_country, "United States")).execute();
// 	const domesticBatchs = await db.select().from(batchs).where(eq(batchs.sender_country, "United States")).execute();
// 	// count the total orders from the labels and batchs by each stats
// 	const domesticStates = domesticLabels.map((label: any) => label.sender_state);
// 	const domesticBatchsStates = domesticBatchs.map((batch: any) => batch.sender_state);
// 	const allStates = [...domesticStates, ...domesticBatchsStates];
// 	// count the total orders by each state and sort them by count and get the top 10 states the each record will be like state: "California", orders: 400
// 	const popularStates = allStates.reduce((acc: any, state: any) => {
// 		if (!acc[state]) {
// 			acc[state] = 1;
// 		} else {
// 			acc[state]++;
// 		}
// 		return acc;
// 	}, {});

// 	const topStates = Object.keys(popularStates).map((state) => {
// 		return {
// 			state,
// 			orders: popularStates[state]
// 		}
// 	}).sort((a, b) => b.orders - a.orders).slice(0, 10);
// 	// find all refunds request by from refunds then also the fetch the data from batch table using the batch_id from the refunds table and then add join fetch all the batchs data where batch_id in refunds table match with uuid in batchs table
// 	const matchingBatches = await drizzle(c.env.DB)
// 		.select({
// 			batch_uuid: refunds.batch_uuid,
// 			batch_created_at: batchs.created_at,
// 			refund_created_at: refunds.created_at,
// 			refund_amount: batchs.cost_user,
// 			status: refunds.is_refunded,


// 		})
// 		.from(batchs)
// 		.innerJoin(refunds, eq(refunds.batch_uuid, batchs.uuid))
// 		.all();
// 	// now calculate the total refunds 
// 	const totalActiveRefunds = matchingBatches.reduce((acc: any, batch: any) => {
// 		return acc + batch.refund_amount;
// 	}, 0);


// 	const payload = {
// 		statisticCard: {
// 			totalUsers: totalUsers[0].count,
// 			newlyRegisteredUsers: 4,
// 			openTickets: OpenTicket[0].count,
// 			refundsRequests: totalActiveRefunds,
// 		},
// 		earningRefunds: earningRefunds,
// 		revenueByCategory: revenueByCategory,
// 		monthlyRevenue: formattedRevenue,
// 		topSellingProducts: [{ name: "Product A", value: 400 }, { name: "Product B", value: 300 }, { name: "Product C", value: 300 }, { name: "Product D", value: 200 }],
// 		shippingCategories: [{ name: "Electronics", value: 400 }, { name: "Fashion", value: 300 }, { name: "Home & Garden", value: 300 }, { name: "Sports", value: 200 }],
// 		peakOrderTime: formattedPeakOrderTime,
// 		popularStates: topStates,
// 		referralUsers: topReferralUsers,
// 		paymentMethods: totalAmountByGateway,
// 		profits: allMonthsProfit,

// 		refundedOrders: allMonths,
// 		refundsByCarrier: refundsByCarrier

// 	}

// 	// Return the payload as a JSON response
// 	return c.json(payload);
// };

// export const DashboardAdmin = { Get };





import { weightsRelations } from "./../../database/drizzle-orm/schemas/relations";
import { addresses } from "@schemas/addresses";
import { adminWeights } from "@schemas/adminWeights";
import { batchs } from "@schemas/batchs";
import { payments } from "@schemas/payments";
import { refunds } from "@schemas/refunds";
import { tickets } from "@schemas/tickets";

import { users } from "@schemas/users";
import { weights } from "@schemas/weights";
import { and, count, desc, eq, gt, not, sql, sum } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { differenceInDays } from 'date-fns';
interface Order {
	id: number;
	created_at: string; // Assuming ISO 8601 datetime format
}
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const Get = async (c: Context<App>) => {
	const db = drizzle(c.env.DB);

	const { startDate, endDate } = c.req.query();

	if (!startDate || !endDate) {
		return c.json({ error: "startDate and endDate are required" }, 400);
	}

	const start = new Date(startDate);
	const end = new Date(endDate);
	const isMoreThanMonth = differenceInDays(endDate, startDate) > 30;
	if (start.toDateString() === end.toDateString()) {
		// Set startDate to the first second of the day
		start.setHours(0, 0, 0, 0);

		// Set endDate to the last second of the day
		end.setHours(23, 59, 59, 999);
	} else {
		// Check if both dates are "yesterday"
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);

		if (start.toDateString() === yesterday.toDateString() && end.toDateString() === yesterday.toDateString()) {
			// Set startDate to the first second of "yesterday"
			start.setHours(0, 0, 0, 0);

			// Set endDate to the last second of "yesterday"
			end.setHours(23, 59, 59, 999);
		}
	}

	const totalUsers = await db
		.select({
			count: count(),
		})
		.from(users);

	const OpenTicket = await db
		.select({
			count: count(),
		})
		.from(tickets)
		.where(
			and(
				eq(tickets.status, "active"),
				sql`${tickets.created_at} >= ${start.toISOString()}`,
				sql`${tickets.created_at} <= ${end.toISOString()}`,
			),
		);
	const today = new Date().toISOString().split("T")[0];
	// calculate the peak order time from the batchs table using batch table
	const peakOrderTime = await db
		.select({
			timeFrame: sql`strftime('%Y-%m-%d %H', created_at)`, // Format the datetime to 'YYYY-MM-DD HH'
			orderCount: count(),
		})
		.from(batchs)
		.where(sql`strftime('%Y-%m-%d', created_at) = ${today}`) // Filter by today's date
		.groupBy(sql`strftime('%Y-%m-%d %H', created_at)`)
		.orderBy(sql`strftime('%H', created_at)`); // Order by hour

	const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

	const formattedPeakOrderTime = hours.map((hour) => {
		// Extract only the hour part for comparison
		const found = peakOrderTime.find((order: any) => {
			const orderHour = order.timeFrame.split(" ")[1] + ":00"; // Add ":00" to match with 'hours'
			return orderHour === hour;
		});

		return {
			hours: hour,
			orders: found ? found.orderCount : 0,
		};
	});
	const paymentGateways = ["cashapp", "venmo", "zelle", "crypto", "card"];
	// compute paymentMethods and each method total value using payments table
	const totalAmountByGateway = await db
		.select({
			name: payments.gateway,
			// add $ sign to the value to show that it is a currency
			value: sql`SUM(${payments.credit})`,
		})
		.from(payments)
		.where(
			and(
				not(eq(payments.gateway, "Label")),
				not(eq(payments.gateway, "Refund")),
				sql`${payments.created_at} >= ${start.toISOString()}`,
				sql`${payments.created_at} <= ${end.toISOString()}`,
			),
		) // Exclude third-party API payments and refunds
		.groupBy(payments.gateway) // Group by gateway only, not by user_id
		.orderBy(payments.gateway);

	const paymentMethodsBreakdownByGateway = paymentGateways.map((gateway) => {
		const paymentData = totalAmountByGateway.find((payment) => payment.name === gateway);
		return {
			gateway: paymentData?.name,
			value: paymentData ? paymentData.value : 0, // Assign value 0 if not present in the result
		};
	});

	// compute refunder orders using batchs table by each month by name

	

	

	const formatDate = (date: Date) => {
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${day}/${month}/${year}`; // Ensure this matches the format in your database
	};

	const generateDateRange = (startDate: Date, endDate: Date) => {
		const dates = [];
		let currentDate = new Date(startDate);
		while (currentDate <= endDate) {
			dates.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}
		return dates;
	};

	const generateMonthRange = (startDate: Date, endDate: Date) => {
		const months = [];
		let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
		while (currentDate <= endDate) {
			months.push(new Date(currentDate));
			currentDate.setMonth(currentDate.getMonth() + 1);
		}
		return months;
	};

	let refundedOrders: any;
	let formattedRefundedOrders: any[] = [];

	// Fetch and format refunded orders data
	if (isMoreThanMonth) {
		// Aggregate by month
		refundedOrders = await db
			.select({
				month: sql`strftime('%Y-%m', created_at)`,
				count: count(),
			})
			.from(refunds)
			.where(
				and(
					eq(refunds.is_refunded, true),
					sql`${refunds.created_at} >= ${start.toISOString()}`,
					sql`${refunds.created_at} <= ${end.toISOString()}`,
				),
			)
			.groupBy(sql`strftime('%Y-%m', created_at)`)
			.orderBy(desc(count()));

		// Generate all months in the range
		const allMonths = generateMonthRange(start, end);

		// Fill in missing months with 0
		formattedRefundedOrders = allMonths.map((date) => {
			const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
			const monthName = monthNames[date.getMonth()];
			return {
				date: `${monthName} ${date.getFullYear()}`,
				orders: refundedOrders.find((order: any) => order.month === month)?.count || 0,
			};
		});
	} else {
		// Aggregate by day
		refundedOrders = await db
			.select({
				date: sql`strftime('%d/%m/%Y', created_at)`,
				count: count(),
			})
			.from(refunds)
			.where(
				and(
					eq(refunds.is_refunded, true),
					sql`${refunds.created_at} >= ${start.toISOString()}`,
					sql`${refunds.created_at} <= ${end.toISOString()}`,
				),
			)
			.groupBy(sql`strftime('%d/%m/%Y', created_at)`)
			.orderBy(sql`strftime('%d/%m/%Y', created_at)`);

		// Generate all dates in the range
		const allDates = generateDateRange(start, end);

		// Fill in missing dates with 0
		formattedRefundedOrders = allDates.map((date) => {
			const formattedDate = formatDate(date);
			return {
				date: formattedDate,
				orders: refundedOrders.find((order: any) => order.date === formattedDate)?.count || 0,
			};
		});
	}

	// compute  refundsByCarrier using batchs table by each carrier
	const refundsByCarrier = await db
		.select({
			name: batchs.type,
			value: count(batchs.status_refund),
		})
		.from(batchs)
		.groupBy(batchs.type)
		.where(
			and(
				eq(batchs.status_refund, true),
				sql`${batchs.created_at} >= ${start.toISOString()}`,
				sql`${batchs.created_at} <= ${end.toISOString()}`,
			),
		);

	// return the top 10 referralUsers that referred the most users if user not refer any it refer_from is null
	const topReferralUsers = await db
		.select({
			id: users.id,
			name: users.first_name,
			fullName: users.last_name,
			email: users.email_address,
			timeZone: users.timezone,
			referrals: count(users.refer_from),
			joined: users.created_at,
			status: users.email_verified,
			uuid: users.uuid,
		})
		.from(users)
		.where(gt(users, 0))
		.execute();

	const totalEarnings = await db
		.select({
			totalEarnings: sql`SUM(${payments.credit})`,
		})
		.from(payments)
		.where(
			and(
				not(eq(payments.gateway, "Refund")),
				sql`${payments.created_at} >= ${start.toISOString()}`,
				sql`${payments.created_at} <= ${end.toISOString()}`,
			),
		)
		.execute();

	const totalRefunds = await db
		.select({
			totalRefunds: sql`SUM(${payments.credit})`,
		})
		.from(payments)
		.where(
			and(
				eq(payments.gateway, "Refund"),
				sql`${payments.created_at} >= ${start.toISOString()}`,
				sql`${payments.created_at} <= ${end.toISOString()}`,
			),
		)
		.execute();

	const earningRefunds = [
		{ name: "Total Earnings", value: totalEarnings[0].totalEarnings ? totalEarnings[0].totalEarnings : 0 },
		{ name: "Refunds", value: totalRefunds[0].totalRefunds ? totalRefunds[0].totalRefunds : 0 },
	];

	// compute the total profit by summing the total credit in the payment table and subtracting the refunds and lables as expese where gateway is is label and refund in gateway

	// Determine if the date range spans more than a month

	let profits;
	let profitByMonths: any[] = [];

	// // Fetch data
	if (isMoreThanMonth) {
		// Aggregate by month
		profits = await db
			.select({
				month: sql`strftime('%Y-%m', created_at)`,
				profit: sum(sql<number>`((${batchs.cost_reseller} - ${batchs.cost_user}))`),
			})
			.from(batchs)
			.groupBy(sql`strftime('%Y-%m', created_at)`)
			.orderBy(desc(sql`strftime('%Y-%m', created_at)`))
			.where(
				and(
					eq(batchs.status_label, "completed"),
					sql`${batchs.updated_at} >= ${start.toISOString()}`,
					sql`${batchs.updated_at} <= ${end.toISOString()}`,
				),
			)

		// Format for months
		const profitByMonth = profits.map((profit: any) => ({
			date: profit.month, // Format as YYYY-MM
			profit: parseFloat(profit.profit),
		}));

		// Generate all months in the range
		const allMonths = generateMonthRange(start, end);

		// Fill in missing months with profit of 0
		profitByMonths = allMonths.map((date) => {
			const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
			const monthName = monthNames[date.getMonth()];
			return {
				date: `${monthName} ${date.getFullYear()}`, // Use month name and year
				profit: profitByMonth.find((item: any) => item.date === month)?.profit || 0, // Default to 0 if no data
			};
		});
	} else {
		// Aggregate by day
		profits = await db
			.select({
				date: sql`strftime('%d/%m/%Y', created_at)`, // Format as DD/MM/YYYY
				profit: sum(sql<number>`((${batchs.cost_reseller} - ${batchs.cost_user}))`),
			})
			.from(batchs)
			.groupBy(sql`strftime('%d/%m/%Y', created_at)`)
			.orderBy(sql`strftime('%d/%m/%Y', created_at)`)
			.where(
				and(
					eq(batchs.status_label, "completed"),
					sql`${batchs.updated_at} >= ${start.toISOString()}`,
					sql`${batchs.updated_at} <= ${end.toISOString()}`,
				),
			);

		// Format for days
		const profitByDay = profits.map((profit: any) => ({
			date: profit.date, // Format as DD/MM/YYYY
			profit: parseFloat(profit.profit),
		}));

		// Generate all dates in the range
		const allDates = generateDateRange(start, end);

		// Fill in missing dates with profit of 0
		profitByMonths = allDates.map((date) => {
			const formattedDate = formatDate(date);
			return {
				date: formattedDate,
				profit: profitByDay.find((item: any) => item.date === formattedDate)?.profit || 0, // Default to 0 if no data
			};
		});
	}

	// Query batch data



	const demo = await db
			.select({
				month: sql`strftime('%Y-%m', created_at)`,
				profit: sum(sql<number>`((${batchs.cost_reseller} - ${batchs.cost_user}))`),
			})
			.from(batchs)
			.groupBy(sql`strftime('%Y-%m', created_at)`)
			.orderBy(desc(sql`strftime('%Y-%m', created_at)`))
			
console.log(demo, "--------------> demo");


	const batchData = await db
		.select({ recipients: batchs.recipients })
		.from(batchs)
		.where(and(sql`${batchs.created_at} >= ${start.toISOString()}`, sql`${batchs.created_at} <= ${end.toISOString()}`))
		.all();

	// Process recipients
	const stateCount: Record<string, number> = {};
	batchData.forEach((batch: any) => {
		try {
			const recipients = typeof batch.recipients === "string" ? JSON.parse(batch.recipients) : batch.recipients;
			recipients.forEach((recipient: any) => {
				const state = recipient.state;
				if (state) {
					stateCount[state] = (stateCount[state] || 0) + 1;
				}
			});
		} catch (error) {
			console.error("Error parsing recipients JSON:", error);
		}
	});

	// Format and sort the results
	const formattedPopularStates = Object.entries(stateCount)
		.map(([state, count]) => ({ state, orders: count }))
		.sort((a, b) => b.orders - a.orders);

	const topSpenders = await db
		.select({
			first_name: users.first_name,
			last_name: users.last_name,
			total_spent: users.total_spent,
			email: users.email_address,
		})
		.from(users)
		.orderBy(desc(users.total_spent))
		.where(and(sql`${users.updated_at} >= ${start.toISOString()}`, sql`${users.updated_at} <= ${end.toISOString()}`))
		.limit(10);

	const refundedOrdersAmount = await db
		.select({ count: count(refunds.is_refunded) })
		.from(refunds)
		.where(
			and(
				eq(refunds.is_refunded, true),
				sql`${refunds.created_at} >= ${start.toISOString()}`,
				sql`${refunds.created_at} <= ${end.toISOString()}`,
			),
		);

	const refundsRequests = await db
		.select({ count: count(refunds.is_refunded) })
		.from(refunds)
		.where(
			and(
				eq(refunds.is_refunded, false),
				sql`${refunds.created_at} >= ${start.toISOString()}`,
				sql`${refunds.created_at} <= ${end.toISOString()}`,
			),
		);

	const topShippingCategories = await db
		.select({ value: count(batchs.id), name: batchs.type_value })
		.from(batchs)
		.groupBy(batchs.type_value)
		.where(
			and(
				eq(batchs.status_refund, false),
				sql`${batchs.created_at} >= ${start.toISOString()}`,
				sql`${batchs.created_at} <= ${end.toISOString()}`,
			),
		);
	// .where(eq(batchs.status_refund, false));

	const pendingRefundedAmount = await db
		.select({ count: count(refunds.is_refunded) })
		.from(refunds)
		.where(
			and(
				eq(refunds.is_refunded, false),
				sql`${refunds.created_at} >= ${start.toISOString()}`,
				sql`${refunds.created_at} <= ${end.toISOString()}`,
			),
		);

	const newlyRegisteredUsers = await db
		.select({ count: count(users.email_address) })
		.from(users)
		.where(and(sql`${users.created_at} >= ${start.toISOString()}`, sql`${users.created_at} <= ${end.toISOString()}`));

	const totalProfitsWithType = await db
		.select({
			type: batchs.type,
			profit: sum(sql<number>`((${batchs.cost_reseller} - ${batchs.cost_user}))`).as("total_profit"),
		})
		.from(batchs)
		.where(
			and(
				eq(batchs.status_label, "completed"),
				sql`${batchs.created_at} >= ${start.toISOString()}`,
				sql`${batchs.created_at} <= ${end.toISOString()}`,
			),
		)
		.groupBy(batchs.type)
		.execute();

	const totalProfit = totalProfitsWithType.reduce((acc, data) => acc + Number(data.profit), 0);

	const payload = {
		totalProfitsWithType,
		topUsers: topSpenders,
		profits: profits,
		totalProfit,
		statisticCard: {
			totalUsers: totalUsers[0].count,
			newlyRegisteredUsers: newlyRegisteredUsers[0].count,
			openTickets: OpenTicket[0].count,
			refundedOrdersAmount: refundedOrdersAmount[0].count,
			refundsRequests: refundsRequests[0].count,
			pendingRefundedAmount: pendingRefundedAmount[0].count,
		},
		earningRefunds: earningRefunds,
		revenueByCategory: [
			{ name: "Category A", value: 400 },
			{ name: "Category B", value: 300 },
			{ name: "Category C", value: 300 },
		],
		monthlyRevenue: [
			{ name: "January", value: 400 },
			{ name: "February", value: 300 },
			{ name: "March", value: 300 },
			{ name: "April", value: 200 },
			{ name: "May", value: 100 },
			{ name: "June", value: 50 },
			{ name: "July", value: 40 },
			{ name: "August", value: 30 },
			{ name: "September", value: 20 },
			{ name: "October", value: 10 },
			{ name: "November", value: 5 },
			{ name: "December", value: 8 },
		],
		topSellingProducts: [
			{ name: "Product A", value: 400 },
			{ name: "Product B", value: 300 },
			{ name: "Product C", value: 300 },
			{ name: "Product D", value: 200 },
		],
		shippingCategories: topShippingCategories,
		peakOrderTime: formattedPeakOrderTime,
		popularStates: formattedPopularStates,

		referralUsers: topReferralUsers,
		paymentMethodsBreakdownByGateway,
		profitByMonth: profitByMonths,
	

		refundedOrders: formattedRefundedOrders,
		refundsByCarrier: refundsByCarrier,
	};

	// Return the payload as a JSON response
	return c.json(payload);
};

export const DashboardAdmin = { Get };