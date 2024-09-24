import AlertWrapper from "@client/components/common/alert";
import { Button } from "@client/components/ui/button";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const TableMenu = ({ id, status }: { id: number; status: string | null }) => {
	const [accept, setAccept] = React.useState(false);
	const [reject, setReject] = React.useState(false);

	const queryClient = useQueryClient();

	const { button: acceptButton, setIsLoading: acceptButtonLoading } = useLoading({
		label: "Accept Payment",
		async click() {
			acceptButtonLoading(true);

			const req = await api.url("/admin/payments").useAuth().post({ payment_id: id });
			const res = await req.json<{ success: boolean }>();

			queryClient.invalidateQueries({ queryKey: ["admin", "payments"] });

			if (res.success) {
				setAccept(false);
				acceptButtonLoading(false);
				api.showSuccessToast("Payment accepted successfully");
				return;
			}

			acceptButtonLoading(false);
			api.showErrorToast("Payment could not be accepted");
		},
	});
	const { button: rejectButton, setIsLoading: rejectButtonLoading } = useLoading({
		label: "Reject Payment",
		async click() {
			rejectButtonLoading(true);

			const req = await api.url("/admin/payments").useAuth().delete({ payment_id: id });
			const res = await req.json<{ success: boolean }>();

			queryClient.invalidateQueries({ queryKey: ["admin", "payments"] });

			if (res.success) {
				setAccept(false);
				rejectButtonLoading(false);
				api.showSuccessToast("Payment rejected successfully");
				return;
			}

			rejectButtonLoading(false);
			api.showErrorToast("Payment could not be accepted");
		},
	});

	return (
		<div className="flex gap-4">
			<AlertWrapper
				open={accept}
				setOpen={setAccept}
				trigger={<Button disabled={status === "confirmed" || status === "rejected"}>Accept</Button>}
				action={acceptButton}
				title="Accept payment"
				description="Are you sure you want to accept this payment?"
			/>

			<AlertWrapper
				open={reject}
				setOpen={setReject}
				trigger={
					<Button variant="destructive" disabled={status === "confirmed" || status === "rejected"}>
						Reject
					</Button>
				}
				action={rejectButton}
				title="Reject payment"
				description="Are you sure you want to reject this payment?"
			/>
		</div>
	);
};

export default TableMenu;
