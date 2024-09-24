import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@client/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { Signin } from "@shipaxxess/shipaxxess-zod-v4";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

const SignInFormComponent = ({ setCode }: { setCode: React.Dispatch<React.SetStateAction<string | null>> }) => {
	const { button, setIsLoading } = useLoading({
		label: "SignIn",
		className: "w-full",
	});

	const navigate = useNavigate();

	const form = useForm<Signin.ZODSCHEMA>({
		resolver: zodResolver(Signin.ZODSCHEMA),
		defaultValues: {
			email_address: "",
			password: "",
		},
	});

	const submit = async (data: Signin.ZODSCHEMA) => {
		setIsLoading(true);

		const req = await api.url("/signin_user").post(data);
		const res = await req.json<{ token: string; two_fa: boolean; admin: boolean }>();
		console.log("res", res)
		if (res.admin) {
			localStorage.setItem("token", res.token);
			api.showSuccessToast("Welcome back, admin!");
			navigate("/admin/dashboard");
			return;
		}

		if (res.two_fa) {
			api.showSuccessToast("Please check your email for the two factor code.");
			setIsLoading(false);
			setCode(data.email_address);
			return;
		}

		if (res.token) {
			localStorage.setItem("token", res.token);
			navigate("/dashboard");
			return;
		}

		setIsLoading(false);
		api.showErrorToast();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className="w-full space-y-8" autoComplete="off">
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
						Don&apos;t have an account?{" "}
						<Link to="/signup" className="font-semibold text-primary">
							Sign Up
						</Link>
					</span>
				</div>
			</form>
		</Form>
	);
};

export default SignInFormComponent;
