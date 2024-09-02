import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { Input } from "@client/components/ui/input";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Verify } from "@shipaxxess/shipaxxess-zod-v4";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FaForm = ({ code }: { code: string | null }) => {
	const form = useForm<Verify.ZODSCHEMA>({
		defaultValues: { code: "", email_address: code!, type: "two_fa" },
		resolver: zodResolver(Verify.ZODSCHEMA),
	});

	const navigate = useNavigate();

	const { button, setIsLoading } = useLoading({ label: "Submit", className: "w-full" });

	const submit = async (data: Verify.ZODSCHEMA) => {
		setIsLoading(true);

		const req = await api.url("/two_fa").post(data);
		const res = await req.json<{ token: string }>();

		if (res.token) {
			localStorage.setItem("token", res.token);
			api.showSuccessToast();
			navigate("/dashboard");
			return;
		}

		api.showErrorToast();
		setIsLoading(false);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className="space-y-4">
				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Verification Code</FormLabel>
							<FormControl>
								<Input {...field} autoComplete="on" placeholder="Enter the six digit verification code here" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<FormItem className="hidden">
							<FormLabel>Verification Email</FormLabel>
							<FormControl>
								<Input {...field} autoComplete="on" placeholder="Enter the six digit verification code here" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{button}
			</form>
		</Form>
	);
};

export default FaForm;
