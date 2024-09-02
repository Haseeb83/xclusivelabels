import AlertWrapper from "@client/components/common/alert";
import { Button } from "@client/components/ui/button";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const TableMenu = ({ id, status }: { id?: number; status?: string | null }) => {
	const [Open, setOpen] = React.useState(false);

	const queryClient = useQueryClient();

	const { button: closeButton, setIsLoading: closeButtonLoading } = useLoading({
		label: "Close Ticket",
		async click() {
			closeButtonLoading(true);

			const req = await api.url(`/admin/tickets`).useAuth().delete({ id });
			const res = await req.json<{ success: boolean }>();

			if (res.success) {
				api.showSuccessToast("Ticket closed successfully");
				closeButtonLoading(false);
				setOpen(false);
				queryClient.invalidateQueries({ queryKey: ["admin", "tickets"] });
				return;
			}

			api.showErrorToast();
			closeButtonLoading(false);
			setOpen(false);
		},
	});

	return (
		<div className="flex gap-4">
			<AlertWrapper
				open={Open}
				setOpen={setOpen}
				trigger={
					<Button disabled={status === "closed"} variant="destructive">
						Close
					</Button>
				}
				action={closeButton}
				title="Close ticket"
				description="Are you sure you want to close this ticket?"
			/>
		</div>
	);
};

export default TableMenu;
