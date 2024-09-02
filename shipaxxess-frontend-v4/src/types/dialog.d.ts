import { FieldValues, UseFormReturn } from "react-hook-form";

export interface DialogWrapperWithFormProps<T extends FieldValues> {
	trigger?: React.JSX.Element | null;
	children?: React.JSX.Element | never[];
	title: string;
	description?: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	className?: string;
	form: UseFormReturn<T>;
	onsubmit: (values: T) => void;
	confirm?: React.JSX.Element | null;
}
