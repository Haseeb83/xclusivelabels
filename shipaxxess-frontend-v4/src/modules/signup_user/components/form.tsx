import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@client/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { Link, useNavigate } from "react-router-dom";

import { Signup } from "@shipaxxess/shipaxxess-zod-v4";

type SignUpFormProps = {
	setInboxView: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUpFormComponent = ({ setInboxView }: SignUpFormProps) => {
	const navigate = useNavigate();

	const { button, setIsLoading } = useLoading({
		label: "SignUp",
		className: "w-full",
	});

	const form = useForm<Signup.ZODSCHEMA>({
		resolver: zodResolver(Signup.ZODSCHEMA),
		defaultValues: {
			first_name: "",
			last_name: "",
			email_address: "",
			password: "",
		},
	});

	const submit = async (values: Signup.ZODSCHEMA) => {
		setIsLoading(true);

		const ref = localStorage.getItem("ref");

		if (ref !== null) {
			values.refer_from = ref;
		}

		const res = await api.url("/signup_user").post(values);
		const data = await res.json<{ code: number }>();

		if (data.code === 1004) {
			api.showSuccessToast();
			setInboxView(true);
			navigate(`/signup?email_address=${values.email_address}`);
			return;
		}

		api.showErrorToast();
		setIsLoading(false);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className="space-y-8" autoComplete="off">
				<div className="grid grid-cols-2 gap-8">
					<FormField
						control={form.control}
						name="first_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First name</FormLabel>
								<FormControl>
									<Input placeholder="John" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="last_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last name</FormLabel>
								<FormControl>
									<Input placeholder="Due" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="email_address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email address</FormLabel>
							<FormControl>
								<Input placeholder="example@gmail.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="********" {...field} type="password" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					{button}
					<span className="block pt-5 text-base text-muted-foreground">
						Already have an account?{" "}
						<Link to="/signin" className="font-semibold text-primary">
							Sign In
						</Link>
					</span>
				</div>
			</form>
		</Form>
	);
};

export default SignUpFormComponent;
