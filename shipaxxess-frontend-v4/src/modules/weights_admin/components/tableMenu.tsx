import AlertWrapper from "@client/components/common/alert";
import { Button } from "@client/components/ui/button";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const TableMenu = ({ uuid, id }: { id: number; uuid: string }) => {
	const [Open, setOpen] = React.useState(false);

	const queryClient = useQueryClient();

	const { button: deleteButton, setIsLoading: deleteButtonLoading } = useLoading({
		label: "Delete Weight",
		async click() {
			deleteButtonLoading(true);

			const req = await api.url(`/admin/weights`).useAuth().delete({ id });
			const res = await req.json<{ success: boolean }>();

			if (res.success) {
				api.showSuccessToast("Weight deleted successfully");
				deleteButtonLoading(false);
				setOpen(false);
				queryClient.invalidateQueries({ queryKey: ["admin", "weights"] });
				return;
			}

			api.showErrorToast();
			deleteButtonLoading(false);
			setOpen(false);
		},
	});

	return (
		<div className="flex gap-4">
			<Link to={`/admin/weights/${uuid}`}>
				<Button>Edit</Button>
			</Link>

			<AlertWrapper
				open={Open}
				setOpen={setOpen}
				trigger={<Button variant="destructive">Delete</Button>}
				action={deleteButton}
				title="Delete weight"
				description="Are you sure you want to delete this weight?"
			/>
		</div>
	);
};

export default TableMenu;
