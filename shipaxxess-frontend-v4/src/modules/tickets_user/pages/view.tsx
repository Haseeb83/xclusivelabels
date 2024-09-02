import { useTicketQuery } from "../hooks/useTicketQuery";
import Meta from "@client/components/common/meta";
import React from "react";
import { TicketsSelectModel } from "@db/tickets";
import { ChatsSelectModel } from "@db/chats";
import Title from "@client/components/common/title";
import { Card, CardContent, CardHeader } from "@client/components/ui/card";
import { Badge } from "@client/components/ui/badge";
import moment from "moment-timezone";
import { TimezoneContext } from "@client/contexts/timezone";
import { app } from "@client/config/app";
import { Avatar } from "@client/components/ui/avatar";
import { Separator } from "@client/components/ui/separator";
import SendChatForm from "../components/send";
import Breadcrumb from "@client/components/common/breadcrumb";
import { Ticket } from "lucide-react";
import { useParams } from "react-router-dom";

const ViewTicketUserPage = () => {
	const params = useParams();

	const { timezone } = React.useContext(TimezoneContext);

	const [ticket, setTicket] = React.useState<TicketsSelectModel>();
	const [chats, setChat] = React.useState<ChatsSelectModel[]>([]);

	const ticketQuery = useTicketQuery(params.uuid!);

	React.useEffect(() => {
		if (ticketQuery.data) {
			setTicket(ticketQuery.data.ticket);
			setChat(ticketQuery.data.chats);
		}
	}, [ticketQuery.data]);

	return (
		<>
			<Meta title={`${ticket?.title}`} />

			<div className="px-4 py-8 space-y-8">
				<Title title={ticket?.title || ""} />

				<Breadcrumb
					items={[
						{ title: "Tickets", link: "/tickets", icon: <Ticket size={16} /> },
						{ title: ticket?.title || "", link: `/tickets/view?uuid=${ticket?.uuid}` },
					]}
				/>

				<Card>
					<CardHeader className="inline-block">
						<Badge variant="outline" className="uppercase rounded-lg">
							{ticket?.status}
						</Badge>
						<h1 className="text-2xl">{ticket?.title}</h1>
						<p className="text-muted-foreground">
							{moment.utc(ticket?.created_at).tz(timezone).format(app.time.format)}
						</p>
					</CardHeader>

					<Separator />

					<CardContent>
						{chats.length === 0 && <p className="p-6 text-center text-muted-foreground">No chats found</p>}

						{chats.map((nod) => {
							return (
								<div key={nod.uuid} className="py-4">
									<div className="flex gap-4">
										{nod.user_id === ticket?.user_id ? (
											<Avatar className="items-center justify-center uppercase h-14 w-14 bg-primary/30">
												{nod.message_profile}
											</Avatar>
										) : (
											<Avatar className="items-center justify-center text-white uppercase h-14 w-14 bg-blue-800/60">
												{nod.message_profile}
											</Avatar>
										)}

										<div className="flex flex-col w-full">
											<p className="text-xl font-medium text-primary">{nod.message_author}</p>
											<span className="text-sm text-muted-foreground">
												{moment.utc(nod.created_at).tz(timezone).fromNow()}
											</span>
											<p className="w-full py-4">{nod.message}</p>
										</div>
									</div>
								</div>
							);
						})}

						<SendChatForm chats={chats} setChat={setChat} ticket={ticket} />
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export default ViewTicketUserPage;
