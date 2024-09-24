import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@client/components/ui/alert-dialog";
import React from "react";

const AlertWrapper = ({
	description,
	title,
	trigger,
	open,
	setOpen,
	action,
}: {
	trigger: React.JSX.Element;
	title: string;
	description: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	action?: React.JSX.Element;
}) => {
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					{action}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AlertWrapper;
