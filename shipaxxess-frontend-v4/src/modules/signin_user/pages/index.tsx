import Meta from "@client/components/common/meta";
import AuthLayout from "@client/components/layouts/auth";
import SignInFormComponent from "../components/form";
import SVGsiteLogo from "@client/components/common/logo";
import React from "react";
import FaForm from "../components/FaForm";

const SingInUserPage = () => {
	const [FaCode, setFaCode] = React.useState<string | null>(null);

	return (
		<AuthLayout>
			<Meta title="SignUp" />

			<div className="w-full max-w-2xl p-16 mx-auto bg-white rounded-lg ring ring-primary/5">
				<div className="flex flex-col items-center mb-16">
					<SVGsiteLogo />
					<h1 className="text-2xl font-bold text-primary">Sign In</h1>
					<span className="text-base text-primary/70">Hey there, please signin to continue</span>

					{FaCode !== null ? (
						<div className="flex flex-col gap-6 py-28">
							<div>
								<h1 className="text-xl">Code sent! Check inbox/spam folder</h1>
								<p className="text-base text-muted-foreground">
									Hi, we just sent you a mail with the verification code. Please copy the code here to verify your login
								</p>
							</div>
							<FaForm code={FaCode} />
						</div>
					) : (
						<SignInFormComponent setCode={setFaCode} />
					)}
				</div>
			</div>
		</AuthLayout>
	);
};

export default SingInUserPage;
