import { app } from "@client/config/app";
import { HeaderProps, NotificationProps } from "@client/types/layout";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { Bell, BellDot, Check, ChevronDown, DollarSign, LogOut, Tags } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { numberWithCommas } from "@client/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import moment from "moment-timezone";
import PushNotificationComponent from "./push";
import { UsersSelectModel } from "@db/users";
import { UseQueryResult } from "@tanstack/react-query";
import { useNotificationsQuery, useMarkAsReadMutation } from "@client/hooks/useNotificationsQuery";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "@client/firebase/firebaseConfig";
import { toast } from "sonner";


const Header = ({ items, user }: { items: HeaderProps[]; user: UseQueryResult<UsersSelectModel> }) => {
	const notificationsQuery = useNotificationsQuery();
	onMessage(messaging, (payload: any) => {
		const { title, body, icon } = payload.notification;
		console.log("Notification received", payload);

		const message = `${title} ${body}`;

		// Show notification toast
		toast.info(message, {
			duration: 5000,
			position: "top-right",
			icon: icon ? <img src={icon} alt="Notification Icon" /> : undefined,
		});

		// Refetch notifications
		notificationsQuery.refetch();



	});
	return (
		<header
			className={`sticky h-16 border-b border-primary/5 shadow bg-white flex items-center px-4 justify-between z-40 ${app.mode === "dev" ? "top-9" : "top-0"
				}`}>
			<ProfileDropDownMenu items={items} userQuery={user} />

			<NotificationsComponent userQuery={user} bellRing={bellRing} resetRing={resetBell} />
		</header>
	);
};

export default Header;

const ProfileDropDownMenu = ({
	items,
	userQuery,
}: {
	items: HeaderProps[];
	userQuery: UseQueryResult<UsersSelectModel>;
}) => {
	const navigate = useNavigate();

	return (
		<div className="flex items-center gap-4">
			<DropdownMenu>
				<DropdownMenuTrigger className="flex items-center gap-2 pr-5 border-r outline-none border-primary/5">
					<Avatar>
						<AvatarFallback>
							{userQuery.isSuccess && (
								<>
									{userQuery.data?.first_name.charAt(0)}
									{userQuery.data?.last_name.charAt(0)}
								</>
							)}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col items-start justify-center gap-1">
						{userQuery.isLoading && (
							<>
								<Skeleton className="w-[140px] h-[15px] rounded-full" />
								<Skeleton className="w-[200px] h-[10px] rounded-full" />
							</>
						)}

						{userQuery.isSuccess && (
							<>
								<h1 className="flex items-center gap-1 text-lg font-semibold leading-none tracking-tight text-primary">
									{userQuery.data!.first_name} {userQuery.data!.last_name}
								</h1>
								<p className="text-sm font-normal leading-none text-muted-foreground">
									{userQuery.data!.email_address}
								</p>
							</>
						)}
					</div>
					<ChevronDown />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-[290px]">
					<DropdownMenuLabel className="text-sm">My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{items.map((nod, index) => {
						return (
							<Link key={index} to={nod.slug}>
								<DropdownMenuItem className="flex items-center gap-2 py-2 cursor-pointer">
									{nod.icon}
									<span className="text-sm">{nod.label}</span>
								</DropdownMenuItem>
							</Link>
						);
					})}
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Button
							variant="ghost"
							className="flex items-center justify-start w-full gap-2 px-2 py-1"
							onClick={() => {
								localStorage.removeItem("token");
								navigate("/signin?action=logout");
							}}>
							<LogOut size={16} />
							<span className="text-sm">Logout</span>
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{userQuery.data?.isadmin === false && (
				<Badge variant="outline">Balance: ${numberWithCommas(userQuery.data?.current_balance || 0)}</Badge>
			)}
		</div>
	);
};

const NotificationsComponent = ({ userQuery }: { userQuery: UseQueryResult<UsersSelectModel> }) => {
	const notifications: NotificationProps[] = [];
	const notificationsQuery = useNotificationsQuery();
	const [unreadNotifcationCount, setUnreadNotificationCount] = useState(0);
	const markAsReadMutation = useMarkAsReadMutation();
	const [showBellDot, setShowBellDot] = useState(false);
	notificationsQuery.data?.forEach((notification: { title: any; description: any; created_at: any; read: any; }) => {
		notifications.push({
			title: notification.title,
			description: notification.description,
			created_at: notification.created_at,
			read: notification.read,
		});
	});

	useEffect(() => {
		if (notificationsQuery.isSuccess) {
			const unreadNotifications = notificationsQuery.data?.filter((notification: { read: any; }) => !notification.read);
			if (unreadNotifications?.length) {
				setShowBellDot(true);
			} else {
				setShowBellDot(false);
			}
		}
	}, [notificationsQuery.data]);



	const markAllAsRead = async () => {
		await markAsReadMutation.mutateAsync();
		setShowBellDot(false);
		// update the notification locally
		notificationsQuery.data?.forEach((notification: { read: boolean; }) => {
			notification.read = true;
		});
		setUnreadNotificationCount(0);



	}

	// count unread notifications
	useEffect(() => {
		if (notificationsQuery.isSuccess) {
			const unreadNotifications = notificationsQuery.data?.filter((notification: { read: any; }) => !notification.read);
			setUnreadNotificationCount(unreadNotifications?.length || 0);
		}
	}, [notificationsQuery.data]);






	return (
		<div className="flex items-center gap-4">
			{userQuery.data?.isadmin === false && (
				<>
					<Link to="/orders/new">
						<Button variant="outline" className="gap-2">
							<Tags size={16} /> Create New Label
						</Button>
					</Link>

					<Link to="/payments/new">
						<Button variant="outline" className="gap-2">
							<DollarSign size={16} /> Add Funds
						</Button>
					</Link>
				</>
			)}

			<DropdownMenu>
				<DropdownMenuTrigger className="p-2 rounded outline-none bg-primary/5 hover:ring-2 hover:ring-primary/10">
					<div className="relative">{showBellDot ? <BellDot /> : <Bell />}</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="absolute p-0 -right-5 ">
					<Card className="w-[400px] rounded-lg overflow-hidden">
						<CardHeader>
							<CardTitle>Notifications</CardTitle>

							<CardDescription>You have {unreadNotifcationCount} unread messages.</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4">
							<PushNotificationComponent />
							<ScrollArea className="max-h-[300px] mt-2">
								{notificationsQuery.isLoading && (
									<>
										<Skeleton className="w-full h-5" />
										<Skeleton className="w-full h-10" />
									</>
								)}
								{notifications?.map((notification, index) => (
									<div
										key={index}
										className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 hover:bg-primary/5 py-4 px-3 rounded-lg">
										{!notification.read == true ? <span className="flex w-2 h-2 translate-y-1 rounded-full bg-primary" /> : <span className="flex w-2 h-2 translate-y-1 rounded-full" />}
										<div className="space-y-1">
											<p className="flex items-center justify-between text-sm font-medium leading-none">
												<span>{notification.title}</span>
												<span className="text-xs font-light text-muted-foreground">
													{moment(notification.created_at).fromNow()}
												</span>
											</p>
											<p className="text-sm text-muted-foreground">{notification.description}</p>
										</div>
									</div>
								))}
							</ScrollArea>
							{notificationsQuery.data?.length === 0 && (
								<div className="flex items-center justify-center py-8">
									<img src="/svg/empty.svg" height={200} width={200} alt="empty svg" />
								</div>
							)}
						</CardContent>
						<CardFooter>
							<Button className="w-full" onClick={markAllAsRead}>
								<Check className="w-4 h-4 mr-2" /> Mark all as read
							</Button>
						</CardFooter>
					</Card>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
