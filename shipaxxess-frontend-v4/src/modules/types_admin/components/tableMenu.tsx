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
		label: "Delete Type",
		async click() {
			deleteButtonLoading(true);

			const req = await api.url(`/admin/types`).useAuth().delete({ id });
			const res = await req.json<{ success: boolean }>();

			if (res.success) {
				api.showSuccessToast("Type deleted successfully");
				deleteButtonLoading(false);
				setOpen(false);
				queryClient.invalidateQueries({ queryKey: ["admin", "types"] });
				return;
			}

			api.showErrorToast();
			deleteButtonLoading(false);
			setOpen(false);
		},
	});

	return (
		<div className="flex gap-4">
			<Link to={`/admin/types/${uuid}`}>
				<Button>Edit</Button>
			</Link>

			<AlertWrapper
				open={Open}
				setOpen={setOpen}
				trigger={<Button variant="destructive">Delete</Button>}
				action={deleteButton}
				title="Delete type"
				description="Are you sure you want to delete this type and it's weights as well?"
			/>
		</div>
	);
};

export default TableMenu;
