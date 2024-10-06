import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "@client/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { z } from "zod";
import { toast } from "sonner";
import { Textarea } from "@client/components/ui/textarea";

export const ZODSCHEMA = z.object({
	box_color: z.string().min(1),
	description: z.string().min(1),
	user_id: z.string().min(1),
	title: z.string().min(1),
});

const SingleNoticesComponent = () => {
	const { button, setIsLoading } = useLoading({
		label: "Apply",
		className: "w-full",
	});

	const form = useForm<any>({
		resolver: zodResolver(ZODSCHEMA),
		defaultValues: {
			box_color: "",
			description: "",
			user_id: "",
			title: "",
		},
	});

	const submit = async (values: FieldValues) => {
		try {
		  setIsLoading(true);
	  
		  const res = await api.url(`/admin/notice/${values.user_id}`).post(values);
		  const data = await res.json<{ code: number; success: boolean }>();
	  
		  if (data?.success) {
			toast.success("Notice applied successfully");
			setIsLoading(false);
			return;
		  }
	  
		  toast.error("Something went wrong. Please try again.");
		} catch (err) {
			setIsLoading(false);
		  api.showErrorToast();
		} finally {
		  setIsLoading(false); // This ensures loading stops regardless of success or error.
		}
	  };
	  

	return (
		<div>
			<Form {...form}>
				<h1 className="text-2xl font-bold text-center font-mono mt-10">Single User Notice</h1>
				<form
					onSubmit={form.handleSubmit(submit)}
					className="space-y-4 max-w-xl lg:mt-10 mt-5 mx-auto"
					autoComplete="off">
					<FormField
						control={form.control}
						name="user_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>User Id</FormLabel>
								<FormControl>
									<Input placeholder="User Id" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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
											<SelectItem value="Red">Red</SelectItem>
											<SelectItem value="Yellow">Yellow</SelectItem>
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

export default SingleNoticesComponent;