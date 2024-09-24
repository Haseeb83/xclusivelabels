import AlertWrapper from "@client/components/common/alert";
import { Button } from "@client/components/ui/button";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const TableMenu = ({ id }: { id: number }) => {
	const [Open, setOpen] = React.useState(false);
	const [RemoveOpen, setRemoveOpen] = React.useState(false);

	const queryClient = useQueryClient();

	const { button: processButton, setIsLoading: processButtonLoading } = useLoading({
		label: "Process Label",
		async click() {
			processButtonLoading(true);

			const req = await api.url(`/admin/crons`).useAuth().post({ id });
			const res = await req.json<{ success: boolean }>();

			if (res.success) {
				api.showSuccessToast("label generated successfully");
				processButtonLoading(false);
				setOpen(false);
				queryClient.invalidateQueries({ queryKey: ["admin", "crons"] });
				return;
			}

			api.showErrorToast();
			processButtonLoading(false);
			setOpen(false);
		},
	});

	const { button: removeButton, setIsLoading: removeButtonLoading } = useLoading({
		label: "Remove Label",
		async click() {
			removeButtonLoading(true);

			const req = await api.url(`/admin/crons`).useAuth().delete({ id });
			const res = await req.json<{ success: boolean }>();

			if (res.success) {
				api.showSuccessToast("Cron deleted successfully");
				removeButtonLoading(false);
				setRemoveOpen(false);
				queryClient.invalidateQueries({ queryKey: ["admin", "crons"] });
				return;
			}

			api.showErrorToast();
			removeButtonLoading(false);
			setRemoveOpen(false);
		},
	});

	return (
		<div className="flex gap-4">
			<AlertWrapper
				open={Open}
				setOpen={setOpen}
				trigger={<Button>Process Now</Button>}
				action={processButton}
				title="Process Now"
				description="Are you sure you want to process this label"
			/>

			<AlertWrapper
				open={RemoveOpen}
				setOpen={setRemoveOpen}
				trigger={<Button variant="destructive">Remove</Button>}
				action={removeButton}
				title="Remove label"
				description="Are you sure you want to remove this label from cron"
			/>
		</div>
	);
};

export default TableMenu;
