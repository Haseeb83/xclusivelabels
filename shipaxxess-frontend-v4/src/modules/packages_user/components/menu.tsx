import AlertWrapper from "@client/components/common/alert";
import { DropdownWrapper } from "@client/components/common/dropdown";
import { Button } from "@client/components/ui/button";
import { Separator } from "@client/components/ui/separator";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { PackagesSelectModel } from "@db/packages";
import { useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { Delete, Edit, MoreHorizontal, Trash } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const TableMenu = ({ row }: { row: Row<PackagesSelectModel> }) => {
	const [alertDialog, setAlertDialog] = React.useState<boolean>(false);

	const clientQuery = useQueryClient();

	const { button, setIsLoading } = useLoading({
		label: "Submit",
		async click() {
			setIsLoading(true);

			const req = await api.url("/user/packages").delete({ id: row.original.id });
			const res = await req.json<{ success: boolean }>();

			if (res.success) {
				api.showSuccessToast();
				setIsLoading(false);
				setAlertDialog(false);
				clientQuery.invalidateQueries({ queryKey: ["packages"] });
				return;
			}

			api.showErrorToast();
			setIsLoading(false);
		},
	});

	return (
		<DropdownWrapper
			className="mr-20"
			items={[
				<Link to={`/user/packages/${row.original.uuid}`} key="edit_packages">
					<Button type="button" variant="ghost" className="justify-start w-full gap-2 px-2">
						<Edit size={16} />
						Edit
					</Button>
				</Link>,
				<Separator key="divider" />,
				<AlertWrapper
					open={alertDialog}
					setOpen={setAlertDialog}
					key="delete_address"
					description="Are you sure you want to delete this package? This action cannot be undone"
					title="Are you sure you want to delete this package?"
					trigger={
						<Button type="button" variant="ghost" className="justify-between w-full gap-2 px-2">
							<div className="flex items-center gap-2">
								<Trash size={16} />
								<span>Delete</span>
							</div>
							<Delete size={16} color="red" />
						</Button>
					}
					action={button}
				/>,
			]}>
			<Button size="icon" variant="outline">
				<MoreHorizontal size={18} />
			</Button>
		</DropdownWrapper>
	);
};

export default TableMenu;