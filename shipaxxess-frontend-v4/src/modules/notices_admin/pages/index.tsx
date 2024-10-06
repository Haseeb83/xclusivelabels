import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "@client/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { NavLink, useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { z } from "zod";
import { toast } from "sonner";
import { Textarea } from "@client/components/ui/textarea";
import { Button } from "@client/components/ui/button";

export const ZODSCHEMA = z.object({
	box_color: z.string().min(1),
	description: z.string().min(1),
	title: z.string().min(1),
});

const NoticesComponent = () => {
	const navigate = useNavigate();

	const { button, setIsLoading } = useLoading({
		label: "Apply",
		className: "w-full",
	});

	const form = useForm<any>({
		resolver: zodResolver(ZODSCHEMA),
		defaultValues: {
			box_color: "",
			description: "",
			title: "",
			isGlobal: true,
		},
	});

	const submit = async (values: FieldValues) => {
		try {
			setIsLoading(true);

			const res = await api.url("/admin/notice").post(values);
			const data = await res.json<{ code: number; success: boolean }>();
			console.log(data, "---------> Notice");
			if (data?.success) {
				toast.success("Notice applied successfully");
				setIsLoading(false);
				return
			}
		} catch (err) {

			api.showErrorToast();
			setIsLoading(false);
		}finally {
			setIsLoading(false); // This ensures loading stops regardless of success or error.
		  }
	};

	return (
		<div>
			<NavLink to={"/admin/notice/single"} className="flex justify-end items-end mt-5 mr-5">
				<Button onClick={() => navigate("/notice/single")}>Single User Notice </Button>
			</NavLink>
			<Form {...form}>
				<h1 className="text-2xl font-bold text-center font-mono mt-10">Global Notice</h1>
				<form
					onSubmit={form.handleSubmit(submit)}
					className="space-y-4 max-w-xl lg:mt-10 mt-5 mx-auto"
					autoComplete="off">
					<FormField
						control={form.control}
						name="box_color"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Box Color</FormLabel>
									<Select value={field.value} onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Box Color" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="White">White</SelectItem>
											<SelectItem value="Blue">Blue</SelectItem>
											<SelectItem value="Red">Red</SelectItem>
											<SelectItem value="Green">Green</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="Title" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Message</FormLabel>
								<FormControl>
									<Textarea placeholder="Enter description..." {...field} className="min-h-[100px]" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div>{button}</div>
				</form>
			</Form>
		</div>
	);
};

export default NoticesComponent;