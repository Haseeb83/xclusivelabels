import { Badge } from "@client/components/ui/badge";
import { Button } from "@client/components/ui/button";
import SVGsiteLogo from "@client/components/common/logo";
import { ScrollArea } from "@client/components/ui/scroll-area";
import { app } from "@client/config/app";
import { SidebarProps } from "@client/types/layout";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { UseQueryResult } from "@tanstack/react-query";
import { UsersSelectModel } from "@db/users";

const Sidebar = ({
	slug,
	items,
	query,
}: {
	slug: string;
	items: SidebarProps[];
	query: UseQueryResult<UsersSelectModel>;
}) => {
	return (
		<section
			className={`${
				app.mode === "dev" ? "h-[calc(100vh-36px)] top-9" : "h-screen top-0"
			} w-[18rem] bg-primary sticky flex flex-col`}>
			{/* LOGO */}
			<div className="flex items-center gap-1 p-6 border-b border-primary-foreground/10">
				<SVGsiteLogo className="w-5 h-5" strokeWidth={2} />
			</div>

			{/* MENU ITEMS */}
			<ScrollArea className="flex-1 py-4 space-y-1 side-bar-menu-item-container">
				{items.map((item, index) => {
					return (
						<Link to={item.slug} key={index}>
							<div
								className={`flex items-center justify-between p-4 cursor-pointer transition ease-in-out delay-100 hover:bg-primary-foreground/5 ${
									item.slug === slug && "bg-primary-foreground/5"
								} `}>
								<div className="flex items-center flex-1 gap-2">
									{!query.isLoading ? (
										<>
											{item.icon}
											<span className="text-base font-normal text-primary-foreground">{item.label}</span>
										</>
									) : (
										<>
											<Skeleton className="w-6 h-5 rounded-lg" />
											<Skeleton className="w-[calc(100%-24px)] h-5 rounded-lg" />
										</>
									)}
								</div>
								{!query.isLoading && (
									<div className="flex items-center gap-2">
										{item.badge && <Badge variant="secondary">{item.badge}</Badge>}
									</div>
								)}
							</div>
						</Link>
					);
				})}
			</ScrollArea>

			{/* FOOTER CONTENT */}
			{query.data?.isadmin === false && (
				<div className="p-4">
					<div className="flex flex-col w-full gap-2 p-6 rounded-lg bg-primary-foreground/5">
						<SVGsiteLogo className="w-5 h-5" strokeWidth={2} />
						<h1 className="mb-2 text-xl font-light capitalize text-primary-foreground/70">
							Need help with <b className="font-bold text-primary-foreground">{app.name}</b>?
						</h1>
						<Link to="/tickets/new?type=other">
							<Button className="w-full text-base bg-black text-primary-foreground">Contact Us</Button>
						</Link>
					</div>
				</div>
			)}
		</section>
	);
};

export default Sidebar;
