import { HeaderProps, SidebarProps } from "@client/types/layout";
import {
	Home,
	Tags,
	MapPin,
	Boxes,
	CreditCard,
	Ticket,
	Users,
	Store,
	Settings,
	UserCircle2,
	BadgePercent,
	BellDot,
	User,
	Type,
	Weight,
	CircleDotDashed,
	LifeBuoy,
	CircleDollarSign,
} from "lucide-react";
import { endOfMonth, startOfDay } from "date-fns";
import { startOfMonth } from "date-fns";
import { startOfYear } from "date-fns";
import { subYears } from "date-fns";
import { subMonths } from "date-fns";
import { endOfDay } from "date-fns";
import { subDays } from "date-fns";
import { createStaticRanges } from "react-date-range";
// Sidebar items
export const sidebarItems: SidebarProps[] = [
	{
		icon: <Home color="#fff" size={20} />,
		label: "Dashboard",
		slug: "/user/dashboard",
	},
	{
		icon: <Tags color="#fff" size={20} />,
		label: "Orders",
		slug: "/user/orders",
		badge: "new",
	},
	{
		icon: <MapPin color="#fff" size={20} />,
		label: "From Addresses",
		slug: "/user/addresses",
		badge: "new",
	},
	{
		icon: <Boxes color="#fff" size={20} />,
		label: "Saved Packages",
		slug: "/user/packages",
		badge: "new",
	},
	{
		icon: <CreditCard color="#fff" size={20} />,
		label: "Payments",
		slug: "/user/payments",
		badge: "new",
	},
	{
		icon: <LifeBuoy color="#fff" size={20} />,
		label: "Support",
		slug: "/user/tickets",
		badge: "new",
	},

	{
		icon: <Users color="#fff" size={20} />,
		label: "Referrals",
		slug: "/user/referrals",
		badge: "new",
	},
	{
		icon: <Store color="#fff" size={20} />,
		label: "Stores",
		slug: "/user/stores",
		badge: "new",
	},
	{
		icon: <Settings color="#fff" size={20} />,
		label: "Settings",
		slug: "/user/settings",
	},
];

// Admin sidebar items
export const adminSidebarItems: SidebarProps[] = [
	{
		icon: <Home color="#fff" size={20} />,
		label: "Dashboard",
		slug: "/admin/dashboard",
	},
	{
		icon: <Tags color="#fff" size={20} />,
		label: "Batches",
		slug: "/admin/batches",
		badge: "new",
	},
	{
		icon: <Type color="#fff" size={20} />,
		label: "Types",
		slug: "/admin/types",
		badge: "new",
	},
	{
		icon: <Weight color="#fff" size={20} />,
		label: "Weights",
		slug: "/admin/weights",
		badge: "new",
	},
	{
		icon: <CreditCard color="#fff" size={20} />,
		label: "Payments",
		slug: "/admin/payments",
		badge: "new",
	},
	{
		icon: <Ticket color="#fff" size={20} />,
		label: "Tickets",
		slug: "/admin/tickets",
		badge: "new",
	},
	{
		icon: <BadgePercent color="#fff" size={20} />,
		label: "Coupons",
		slug: "/admin/coupons",
		badge: "new",
	},
	{
		icon: <Users color="#fff" size={20} />,
		label: "Users",
		slug: "/admin/users",
		badge: "new",
	},
	{
		icon: <CircleDotDashed color="#fff" size={20} />,
		label: "Crons",
		slug: "/admin/crons",
		badge: "new",
	},
	{
		icon: <CircleDollarSign color="#fff" size={20} />,
		label: "Notice",
		slug: "/admin/notice",
		badge: "new",
	},
	{
		icon: <CircleDollarSign color="#fff" size={20} />,
		label: "Refunds",
		slug: "/admin/refunds",
		badge: "new",
	},
	{
		icon: <Settings color="#fff" size={20} />,
		label: "Settings",
		slug: "/admin/settings",
	},
];

// Header items
export const headerItems: HeaderProps[] = [
	{ label: "Profile", slug: "/settings?tab=profile", icon: <UserCircle2 /> },
	{ label: "Coupons", slug: "/settings?tab=coupons", icon: <BadgePercent /> },
	{
		label: "Notifications",
		slug: "/settings?tab=notifications",
		icon: <BellDot />,
	},
];

// Admin items
export const adminHeaderItems: HeaderProps[] = [
	...headerItems,
	{
		icon: <User />,
		label: "Admin Mode",
		slug: "/admin/batchs",
	},
];

const now = new Date();
const startDateforLastThiryDay = subDays(now, 29);

export const predefinedRanges = createStaticRanges([
	{
		label: "Today",
		range: () => ({
			startDate: new Date(new Date().setHours(0, 0, 0, 0)),
			endDate: new Date(new Date().setSeconds(59, 999)),
		}),
	},
	{
		label: "Yesterday",
		range: () => ({
			startDate: subDays(new Date(), 1),
			endDate: subDays(new Date(), 1),
		}),
	},
	{
		label: "Last 7 Days",
		range: () => ({
			startDate: subDays(new Date(), 6),
			endDate: new Date(),
		}),
	},
	{
		label: "Last 30 Days",
		range: () => ({
			startDate: startOfDay(startDateforLastThiryDay),
			endDate: endOfDay(now),
		}),
	},
	{
		label: "This Month",
		range: () => ({
			startDate: startOfMonth(new Date()),
			endDate: endOfMonth(new Date()),
		}),
	},
	{
		label: "Last Month",
		range: () => {
			const now = new Date();
			const lastMonthStart = startOfMonth(subMonths(now, 1));
			const lastMonthEnd = endOfMonth(subMonths(now, 1));
			return {
				startDate: lastMonthStart,
				endDate: lastMonthEnd,
			};
		},
	},
	{
		label: "Last 3 Months",
		range: () => {
			const now = new Date();
			const threeMonthsAgo = subMonths(now, 2);
			// Start from the same day, 3 months ago
			const startDate = threeMonthsAgo;
			const endDate = new Date(); // Till today's date
			return {
				startDate,
				endDate,
			};
		},
	},
	{
		label: "Last 6 Months",
		range: () => {
			const now = new Date();
			const sixMonthsAgo = subMonths(now, 5);
			return {
				startDate: startOfMonth(sixMonthsAgo),
				endDate: new Date(),
			};
		},
	},

	{
		label: "Last 1 Year",
		range: () => ({
			startDate: startOfYear(subYears(new Date(), 0)),
			endDate: new Date(),
		}),
	},
]);