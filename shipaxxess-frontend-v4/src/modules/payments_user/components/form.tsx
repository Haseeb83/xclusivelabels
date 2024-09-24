import { Form } from "@client/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Payment } from "@shipaxxess/shipaxxess-zod-v4";
import { useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@client/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@client/components/ui/alert";
import { Input } from "@client/components/ui/input";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { useNavigate } from "react-router-dom";
import { UseQueryResult } from "@tanstack/react-query";
import { GatewayProps } from "@client/types/gateway";

const NewPaymentForm = ({ query }: { query: UseQueryResult<GatewayProps> }) => {
	const form = useForm<Payment.ZODSCHEMA>({
		defaultValues: { credit: 10, gateway: "card" },
		resolver: zodResolver(Payment.ZODSCHEMA),
	});

	const navigate = useNavigate();

	const { button, setIsLoading } = useLoading({ label: "Submit" });

	const submit = async (values: Payment.ZODSCHEMA) => {
		setIsLoading(true);
		const req = await api.url("/user/payments").post(values);
		const res = await req.json<{ url?: string; success?: boolean }>();

		if (res.url) {
			window.location.href = res.url;
			return;
		}

		if (res.success) {
			api.showSuccessToast();
			navigate("/payments");
			return;
		}

		api.showErrorToast();
		setIsLoading(false);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className="space-y-3">
				<FormField
					control={form.control}
					name="credit"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Credit ($)</FormLabel>
							<FormControl>
								<Input {...field} type="number" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="gateway"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Payment Method</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="card">
										Credit/Debit Card <span className="text-xs text-muted-foreground">(instantly)</span>
									</SelectItem>
									<SelectItem value="crypto">
										Crypto Currency <span className="text-xs text-muted-foreground">(instantly)</span>
									</SelectItem>
									<SelectItem value="venmo">
										Venmo <span className="text-xs text-muted-foreground">(2-3 hours)</span>
									</SelectItem>
									<SelectItem value="cashapp">
										CashApp <span className="text-xs text-muted-foreground">(2-3 hours)</span>
									</SelectItem>
									<SelectItem value="zelle">
										Zelle <span className="text-xs text-muted-foreground">(2-3 hours)</span>
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{form.watch("gateway") === "venmo" && (
					<Alert>
						<AlertTitle>Venmo</AlertTitle>
						<AlertDescription>
							Please send <b>${form.watch("credit")}</b> to <b>{query.data?.venmo_email || "[unknown]"}</b>
						</AlertDescription>
					</Alert>
				)}
				{form.watch("gateway") === "zelle" && (
					<Alert>
						<AlertTitle>Zelle</AlertTitle>
						<AlertDescription>
							Please send <b>${form.watch("credit")}</b> to <b>{query.data?.zelle_email || "[unknown]"}</b>
						</AlertDescription>
					</Alert>
				)}
				{form.watch("gateway") === "cashapp" && (
					<Alert>
						<AlertTitle>CashApp</AlertTitle>
						<AlertDescription>
							Please send <b>${form.watch("credit")}</b> to <b>{query.data?.cashapp_email || "[unknown]"}</b>
						</AlertDescription>
					</Alert>
				)}

				{button}
			</form>
		</Form>
	);
};

export default NewPaymentForm;
