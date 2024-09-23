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

	// Example function definitions for bell notification
	const bellRing = () => {
		// This function is called when there are unread notifications
	};

	const resetBell = () => {
		// This function is called when all notifications are marked as read
	};

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
			className={`sticky h-16 border-b border-primary/5 shadow bg-white flex items-center px-4 justify-between z-40 ${
				app.mode === "dev" ? "top-9" : "top-0"
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

const NotificationsComponent = ({
	userQuery,
	bellRing,
	resetRing,
}: {
	userQuery: UseQueryResult<UsersSelectModel>;
	bellRing: () => void;
	resetRing: () => void;
}) => {
	const notifications: NotificationProps[] = [];
	const notificationsQuery = useNotificationsQuery();
	const [unreadNotifcationCount, setUnreadNotificationCount] = useState(0);
	const markAsReadMutation = useMarkAsReadMutation();

	notificationsQuery.data?.forEach((notification: { title: any; description: any; created_at: any; read: any }) => {
		notifications.push({
			title: notification.title,
			description: notification.description,
			created_at: notification.created_at,
			read: notification.read,
		});
	});

	useEffect(() => {
		if (notificationsQuery.isSuccess) {
			const unreadNotifications = notificationsQuery.data?.filter((notification: { read: any }) => !notification.read);
			if (unreadNotifications?.length) {
				bellRing();
			} else {
				resetRing();
			}
		}
	}, [notificationsQuery.data, bellRing, resetRing]);

	const markAllAsRead = async () => {
		await markAsReadMutation.mutateAsync();
		resetRing();
		notificationsQuery.data?.forEach((notification: { read: boolean }) => {
			notification.read = true;
		});
		setUnreadNotificationCount(0);
	};

	useEffect(() => {
		if (notificationsQuery.isSuccess) {
			const unreadNotifications = notificationsQuery.data?.filter((notification: { read: any }) => !notification.read);
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
					<div className="relative">
						{unreadNotifcationCount > 0 ? <BellDot /> : <Bell />}
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="absolute p-0 -right-5 ">
					<Card className="w-[400px] rounded-lg overflow-hidden">
						<CardHeader>
							<CardTitle>Notifications</CardTitle>

							<CardDescription>You have {unreadNotifcationCount} unread messages.</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4">
							<ScrollArea className="h-[300px] w-full rounded-md">
								{notificationsQuery.isLoading && (
									<div className="flex flex-col gap-2">
										<Skeleton className="w-full h-[70px]" />
										<Skeleton className="w-full h-[70px]" />
										<Skeleton className="w-full h-[70px]" />
									</div>
								)}

								{notificationsQuery.isSuccess &&
									notifications.map((notification, index) => {
										return (
											<Card key={index} className="w-full rounded-lg border">
												<CardHeader className="w-full items-start justify-between">
													<h1 className="font-medium text-md">{notification.title}</h1>
													<CardDescription>{notification.description}</CardDescription>
												</CardHeader>

												<CardFooter className="w-full items-center justify-between">
													<p className="text-xs font-normal leading-none text-muted-foreground">
														{moment(notification.created_at).fromNow()}
													</p>
													{notification.read === false && (
														<Button
															variant="outline"
															size="sm"
															className="text-xs py-0 h-7"
															onClick={() => markAsReadMutation.mutateAsync()}>
															<Check size={16} />
															Mark as Read
														</Button>
													)}
												</CardFooter>
											</Card>
										);
									})}
							</ScrollArea>
						</CardContent>
						<CardFooter>
							<Button variant="default" className="gap-2" onClick={() => markAllAsRead()}>
								<Check size={16} /> Mark All as Read
							</Button>
						</CardFooter>
					</Card>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
