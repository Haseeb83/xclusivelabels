import SVGsiteLogo from "@client/components/common/logo";
import { app } from "@client/config/app";
import useQuery from "@client/hooks/useQuery";
import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children }: { children: React.JSX.Element | React.JSX.Element[] }) => {
	const query = useQuery();

	React.useEffect(() => {
		if (query.get("ref") !== null) {
			localStorage.setItem("ref", query.get("ref")!);
		}
	}, [query]);

	return (
		<section className="flex w-full h-screen login-page bg-primary lg:bg-primary-foreground">
			{/* LEFT BANNER */}
			<div className="flex-col justify-between hidden w-3/5 h-full p-20 rounded-tr-lg rounded-br-lg bg-primary lg:flex">
				<Link to="/" className="flex items-center gap-2 logo">
					<SVGsiteLogo stroke="#fff" />
					<span className="text-lg font-semibold text-primary-foreground">{app.name}</span>
				</Link>

				<div className="flex flex-col gap-2">
					<h1 className="text-4xl font-semibold text-primary-foreground">Fast, Efficient and Productive</h1>
					<p className="text-base text-primary-foreground/70">
						In this kind of post, the blogger introduces a person they&apos;ve interviewed and provides some background
						information about the interviewee and their work following this is a transcript of the interview.
					</p>
				</div>
			</div>

			{/* RIGHT CONTENT */}
			<div className="flex items-center justify-center w-full h-full lg:w-2/5">{children}</div>
		</section>
	);
};

export default AuthLayout;
