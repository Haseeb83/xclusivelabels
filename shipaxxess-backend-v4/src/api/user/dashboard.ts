import { payments } from "@schemas/payments";
import { users } from "@schemas/users";
import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { batchs } from "@schemas/batchs";
import { labels } from "@schemas/labels";
import { and, count, desc, eq, sql, sum } from "drizzle-orm";
import statesData from "../../../../shipaxxess-frontend-v4/src/data/states.json";
import { refunds } from "@schemas/refunds";
import { backupdr } from "googleapis/build/src/apis/backupdr";
import { differenceInDays } from "date-fns";


const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const Get = async (c: Context<App>) => {
	const db = drizzle(c.env.DB);
	const userId = c.get("jwtPayload").id;

	// Generate an array of Date objects for all months in the given range
	function generateMonthRange(start: Date, end: Date): Date[] {
		const dateArray = [];
		let currentDate = new Date(start);

		while (currentDate <= end) {
			dateArray.push(new Date(currentDate));
			currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
		}

		return dateArray;
	}

	// Generate an array of Date objects for all dates in the given range
	function generateDateRange(start: Date, end: Date): Date[] {
		const dateArray = [];
		let currentDate = new Date(start);

		while (currentDate <= end) {
			dateArray.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
		}

		return dateArray;
	}

	// Format a Date object as 'DD/MM/YYYY'
	function formatDate(date: Date): string {
		return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
			.toString()
			.padStart(2, "0")}/${date.getFullYear()}`;
	}

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

	// Fetch the user information
	const user = await db.select().from(users).where(eq(users.id, userId));
	const logginUser = user[0];

	// Ensure the user exists
	if (!logginUser) {
		return c.json({ error: "User not found" }, 404);
	}

	// Fetch the number of shipments and total cost_user per state for the current user
	const topStateResultsRaw = await db
		.select({
			state: batchs.sender_state,
			totalShipments: sql`COUNT(*)`.as<number>(),
			totalCostUser: sql`SUM(${labels.cost_user})`.as<number>(), // Use `labels.cost_user` if correct
		})
		.from(batchs)
		.where(
			and(
				eq(batchs.user_id, userId),
				eq(batchs.status_label, "completed"),
				sql`${batchs.updated_at} >= ${start.toISOString()}`,
				sql`${batchs.updated_at} <= ${end.toISOString()}`,
			),
		) // Ensure correct field if `user_id` is in `batchs`
		.groupBy(batchs.sender_state)
		.execute();


	// Fetch the number of shipments per month for the current user in the current year
	let monthlyShipmentsRaw: any;
	let monthlyShipments: any[] = [];

	if (isMoreThanMonth) {
		// Aggregate by month
		monthlyShipmentsRaw = await db
			.select({
				month: sql`strftime('%Y-%m', ${batchs.created_at})`.as<string>(), // Group by month (YYYY-MM)
				value: sql`COUNT(${batchs.id})`,
			})
			.from(batchs)
			.where(
				and(
					eq(batchs.user_id, userId),
					eq(batchs.status_label, "completed"),
					sql`${batchs.created_at} >= ${start.toISOString()}`,
					sql`${batchs.created_at} <= ${end.toISOString()}`,
				),
			)
			.groupBy(sql`strftime('%Y-%m', ${batchs.created_at})`)
			.orderBy(sql`strftime('%Y-%m', ${batchs.created_at})`);

		// Generate all months in the range
		const allMonths = generateMonthRange(start, end);

		// Fill in missing months with 0
		monthlyShipments = allMonths.map((date) => {
			const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
			const monthName = monthNames[date.getMonth()];
			const shipment = monthlyShipmentsRaw.find((item: any) => item.month === month);

			return {
				date: `${monthName} ${date.getFullYear()}`,
				value: shipment ? shipment.value : 0, // Use value if shipment exists, otherwise 0
			};
		});
	} else {
		// Aggregate by day
		monthlyShipmentsRaw = await db
			.select({
				date: sql`strftime('%d/%m/%Y', ${batchs.created_at})`.as<string>(), // Group by day (DD/MM/YYYY)
				value: sql`COUNT(${batchs.id})`,
			})
			.from(batchs)
			.where(
				and(
					eq(batchs.user_id, userId),
					eq(batchs.status_label, "completed"),
					sql`${batchs.created_at} >= ${start.toISOString()}`,
					sql`${batchs.created_at} <= ${end.toISOString()}`,
				),
			)
			.groupBy(sql`strftime('%d/%m/%Y', ${batchs.created_at})`)
			.orderBy(sql`strftime('%d/%m/%Y', ${batchs.created_at})`);

		// Generate all dates in the range
		const allDates = generateDateRange(start, end);

		// Fill in missing dates with 0
		monthlyShipments = allDates.map((date) => {
			const formattedDate = formatDate(date); // Format date as 'DD/MM/YYYY'
			const shipment = monthlyShipmentsRaw.find((item: any) => item.date === formattedDate);

			return {
				date: formattedDate,
				value: shipment ? shipment.value : 0, // Use value if shipment exists, otherwise 0
			};
		});
	}

	const totalShipments = topStateResultsRaw.reduce((acc, result) => acc + result.totalShipments, 0);

	const topStateResults = topStateResultsRaw.map((result) => {
		const stateFullName = statesData.find((item) => item.id === result.state)?.name || result.state;
		const averageCostUser = result.totalShipments ? (result.totalCostUser / result.totalShipments).toFixed(2) : "0.00";
		const percentage = totalShipments ? ((result.totalShipments / totalShipments) * 100).toFixed(2) : "0.00";

		return {
			name: stateFullName,
			shipments: result.totalShipments,
			average: averageCostUser,
			percentage: `${percentage}%`,
		};
	});

	// Fetch transaction history for the current user
	const transcationHistory = await db
		.select({
			transactionId: payments.id,
			amount: payments.credit,
			balance: payments.current_balance,
			status: payments.status,
			date: payments.created_at,
			type: payments.gateway,
		})
		.from(payments)
		.where(
			and(
				eq(payments.user_id, userId),
				sql`${payments.created_at} >= ${start.toISOString()}`,
				sql`${payments.created_at} <= ${end.toISOString()}`,
			),
		);

	const pendingRefund = await db
		.select({
			totalLabel: count(batchs.id),
			amount: sum(batchs.cost_user),
		})
		.from(batchs)

		.where(
			and(
				eq(batchs.user_id, userId),
				eq(batchs.status_label, "pending_refund"),
				sql`${batchs.created_at} >= ${start.toISOString()}`,
				sql`${batchs.created_at} <= ${end.toISOString()}`,
			),
		);

	let avgLabelCost: any;
	let monthlyAvgLabelCost: any[] = [];

	if (isMoreThanMonth) {
		// Aggregate by month
		avgLabelCost = await db
			.select({
				month: sql`strftime('%Y-%m', ${payments.created_at})`.as<string>(), // Group by month (YYYY-MM)
				value: sql`SUM(${payments.credit})`.as<number>(),
				count: sql`COUNT(${payments.id})`.as<number>(),
			})
			.from(payments)
			.where(
				and(
					eq(payments.user_id, userId),
					eq(payments.gateway, "Label"),
					eq(payments.status, "confirmed"),
					sql`${payments.created_at} >= ${start.toISOString()}`,
					sql`${payments.created_at} <= ${end.toISOString()}`,
				),
			)
			.groupBy(sql`strftime('%Y-%m', ${payments.created_at})`)
			.orderBy(sql`strftime('%Y-%m', ${payments.created_at})`);

		// Generate all months in the range
		const allMonths = generateMonthRange(start, end);

		// Fill in missing months with 0
		monthlyAvgLabelCost = allMonths.map((date) => {
			const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
			const monthName = monthNames[date.getMonth()];
			const costData = avgLabelCost.find((cost: any) => cost.month === month);

			return {
				label: `${monthName} ${date.getFullYear()}`,
				value: costData ? costData.value / costData.count : 0, // Calculate average if data exists, otherwise 0
			};
		});
	} else {
		// Aggregate by day
		avgLabelCost = await db
			.select({
				date: sql`strftime('%d/%m/%Y', ${payments.created_at})`.as<string>(), // Group by day (DD/MM/YYYY)
				value: sql`SUM(${payments.credit})`.as<number>(),
				count: sql`COUNT(${payments.id})`.as<number>(),
			})
			.from(payments)
			.where(
				and(
					eq(payments.user_id, userId),
					eq(payments.gateway, "Label"),
					eq(payments.status, "confirmed"),
					sql`${payments.created_at} >= ${start.toISOString()}`,
					sql`${payments.created_at} <= ${end.toISOString()}`,
				),
			)
			.groupBy(sql`strftime('%d/%m/%Y', ${payments.created_at})`)
			.orderBy(sql`strftime('%d/%m/%Y', ${payments.created_at})`);

		// Generate all dates in the range
		const allDates = generateDateRange(start, end);

		// Fill in missing dates with 0
		monthlyAvgLabelCost = allDates.map((date) => {
			const formattedDate = formatDate(date); // Format date as 'DD/MM/YYYY'
			const costData = avgLabelCost.find((cost: any) => cost.date === formattedDate);

			return {
				label: formattedDate,
				value: costData ? costData.value / costData.count : 0, // Calculate average if data exists, otherwise 0
			};
		});
	}

	// Construct the payload
	const payload = {
		staticsCard: {
			currnetBalance: logginUser.current_balance,
			totalSpend: logginUser.total_spent,
			totalRefund: logginUser.total_refund,
			referlBalance: logginUser.credit_for_refer_from_user,
			totalShipingCost: 0, // Calculate as needed
			carrierAdjustment: 0, // Calculate as needed
			pendingRefund: {
				total: pendingRefund[0].totalLabel,
				amount: pendingRefund[0].amount,
			}, // Calculate as needed
			avgDomesticShippingCost: 0, // Calculate as needed
			avgInternationalShippingCost: 0, // Calculate as needed
			newShipment: 0, // Calculate as needed
			deliveryIssues: 0, // Calculate as needed
		},
		totalPayment: 0, // Calculate as needed
		averageCost: monthlyAvgLabelCost, // Calculate as needed
		totalShipment: totalShipments,
		serivces: 0, // Calculate as needed
		recipentZones: 0, // Calculate as needed
		topstates: topStateResults,
		topInternatonal: {
			country: "",
			shipment: 0,
		},
		transcationHistory: transcationHistory,
		monthlyShipments,
	};

	return c.json(payload);
};

export const DashboardUser = { Get };