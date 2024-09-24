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

// Sidebar items
export const sidebarItems: SidebarProps[] = [
	{
		icon: <Home color="#fff" size={20} />,
		label: "Dashboard",
		slug: "/dashboard",
	},
	{
		icon: <Tags color="#fff" size={20} />,
		label: "Orders",
		slug: "/orders",
		badge: "new",
	},
	{
		icon: <MapPin color="#fff" size={20} />,
		label: "From Addresses",
		slug: "/addresses",
		badge: "new",
	},
	{
		icon: <Boxes color="#fff" size={20} />,
		label: "Saved Packages",
		slug: "/packages",
		badge: "new",
	},
	{
		icon: <CreditCard color="#fff" size={20} />,
		label: "Payments",
		slug: "/payments",
		badge: "new",
	},
	{
		icon: <LifeBuoy color="#fff" size={20} />,
		label: "Support",
		slug: "/tickets",
		badge: "new",
	},
	{
		icon: <Users color="#fff" size={20} />,
		label: "Referrals",
		slug: "/referrals",
		badge: "new",
	},
	{
		icon: <Store color="#fff" size={20} />,
		label: "Stores",
		slug: "/stores",
		badge: "new",
	},
	{
		icon: <Settings color="#fff" size={20} />,
		label: "Settings",
		slug: "/settings",
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
