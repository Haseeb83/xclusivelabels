import SVGsiteLogo from "@client/components/common/logo";
import Meta from "@client/components/common/meta";
import { Button } from "@client/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@client/components/ui/form";
import { Input } from "@client/components/ui/input";
import { app } from "@client/config/app";
import { AlignVerticalSpaceBetweenIcon, Contact, DollarSign, ListTodo } from "lucide-react";
import { useForm } from "react-hook-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@client/components/ui/accordion";
import { Link } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ZODSCHEMA = z.object({ weight: z.number() });

type ZODSCHEMA = z.infer<typeof ZODSCHEMA>;

const LandingPage = () => {
	const form = useForm<ZODSCHEMA>({ resolver: zodResolver(ZODSCHEMA) });

	const submit = async (values: ZODSCHEMA) => {
		console.log(values);
	};

	return (
		<>
			<Meta title="The Cheapest Way To Buy Postage For Your Packages" />

			<div className="w-full h-auto py-6">
				<div className="flex items-center justify-between mx-auto max-w-7xl">
					<div className="flex items-center">
						<SVGsiteLogo className="w-5 h-5" stroke="#000" strokeWidth={2} />
						<span className="pl-1 text-xl leading-none uppercase">{app.name}</span>
					</div>

					<div className="flex items-center gap-2">
						<Link to="/signin">
							<Button variant="outline">SignIn</Button>
						</Link>
						<Link to="/signup">
							<Button>SignUp</Button>
						</Link>
					</div>
				</div>
			</div>

			<div className="w-full py-32 bg-blue-100">
				<div className="flex items-center gap-10 mx-auto max-w-7xl">
					<div>
						<h1 className="mb-4 text-4xl font-semibold">The Cheapest Way To Buy Postage For Your Packages</h1>
						<p className="mb-8 text-md">
							Shipping costs are one of the biggest expenses for many small businesses, and we are here to help reduce
							the sting. Our label service will save you money and improve your margins for those large packages.
						</p>
						<Link to="/signup">
							<Button>SignUp Now - It's 100% free</Button>
						</Link>
					</div>
					<div>
						<img src="/banner.png" alt="Banner" />
					</div>
				</div>
			</div>

			<div className="py-32">
				<div className="mx-auto max-w-7xl">
					<h1 className="text-4xl text-center">Features</h1>

					<div className="flex items-center gap-20 mt-6">
						<div className="flex flex-col items-center justify-center gap-3">
							<DollarSign size={40} />
							<h1 className="text-xl font-semibold">No Monthly Fees</h1>
							<p className="text-base text-center">
								We don't charges any fees for using now application. You will just pay for the labels you used
							</p>
						</div>
						<div className="flex flex-col items-center justify-center gap-3">
							<Contact size={40} />
							<h1 className="text-xl font-semibold">No Contracts</h1>
							<p className="text-base text-center">
								We don't charges any fees for using now application. You will just pay for the labels you used
							</p>
						</div>
						<div className="flex flex-col items-center justify-center gap-3">
							<ListTodo size={40} />
							<h1 className="text-xl font-semibold">No Minimums</h1>
							<p className="text-base text-center">
								We don't charges any fees for using now application. You will just pay for the labels you used
							</p>
						</div>
						<div className="flex flex-col items-center justify-center gap-3">
							<AlignVerticalSpaceBetweenIcon size={40} />
							<h1 className="text-xl font-semibold">No Fuss</h1>
							<p className="text-base text-center">
								We don't charges any fees for using now application. You will just pay for the labels you used
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="py-32 bg-blue-100">
				<div className="mx-auto max-w-7xl">
					<h1 className="mb-2 text-4xl font-semibold text-center">USPS & UPS Priority Mail Labels</h1>
					<h2 className="mb-2 text-2xl font-medium text-center">At Affordable Prices</h2>
					<p className="mb-6 text-base text-center">
						We help cover the cost of USPS Priority Mail labels so that your business doesnt have to suffer.
					</p>

					<Form {...form}>
						<form className="max-w-md pt-10 mx-auto" onSubmit={form.handleSubmit(submit)}>
							<FormField
								control={form.control}
								name="weight"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input type="number" placeholder="Enter your weight here to see the price" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button className="w-full mt-6">See Shipping Rate</Button>
						</form>
					</Form>
				</div>
			</div>

			<div className="py-32">
				<div className="flex items-center gap-32 mx-auto max-w-7xl">
					<div>
						<img src="/hero2.jpg" alt="Hero Banner" />
					</div>
					<div>
						<h1 className="mb-2 text-4xl font-semibold">How Does It Work?</h1>
						<p className="mb-16 text-base">
							Select your shipping labels. Proceed to checkout. Attach your customers shipping addresses. Pay us.
							Receive your labels.
						</p>
						<Button>SignUp Now & See for yourself</Button>
					</div>
				</div>
			</div>

			<div className="py-32">
				<div className="mx-auto max-w-7xl">
					<p className="mb-2 text-base">Everything You Want To Know About {app.name}</p>
					<h1 className="mb-8 text-4xl font-semibold">Frequently Asked Questions</h1>

					<div className="flex gap-32">
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="item-1">
								<AccordionTrigger>Do You Offer First Class Labels?</AccordionTrigger>
								<AccordionContent>
									We have the cheapest USPS First Class labels for packages 13 oz and under at only $3.25 to anywhere
									within the United States.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>Your Service Is Awesome, Why Are You Selling It So Cheap?</AccordionTrigger>
								<AccordionContent>
									Small businesses and eCommerce companies are under increasing pressure as shipping prices continue to
									rise. We use group pricing that allows us to offer our customers the best rates online.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>Do You Offer UPS Or FedEx Labels?</AccordionTrigger>
								<AccordionContent>
									We encourage entrepreneurs who are working with UPS and FedEx to convert to USPS with our intriguing
									prices. We are able to beat your current UPS and FedEx prices. Just contact our support team and we
									will work with getting you cheaper rates with USPS.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-4">
								<AccordionTrigger>How Long Does It Take To Get A Shipping Label?</AccordionTrigger>
								<AccordionContent>
									Theres no wait time. Submit your information for your customers and print your labels instantly.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="item-1">
								<AccordionTrigger>Can I Edit My Labels?</AccordionTrigger>
								<AccordionContent>
									If there’s an issue with your shipping label you can contact our team and we will assist with any
									modifications.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>I Just Placed An Order But I Need To Cancel It, Can I Do That?</AccordionTrigger>
								<AccordionContent>
									Yes, if you ordered and want to cancel, you are eligible for a refund only for the first 30 minutes.
									But, if you haven’t notified us within 30 minutes of ordering, we are not obligated to any refunds.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>Do You Offer Cheap International Shipping Services?</AccordionTrigger>
								<AccordionContent>
									Unfortunately, we do not provide services for international shipping labels at this time. If this is a
									service you’re interested in, contact our support team with an estimated amount of international
									orders you’ll be processing daily.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-4">
								<AccordionTrigger>Can I Add Insurance To The Labels?</AccordionTrigger>
								<AccordionContent>
									<p className="mb-2">
										You can purchase InsurePost insurance if the label has not already been scanned at the mail center.
									</p>
									<ul className="pl-8 list-disc">
										<li> Navigate to www.insurepost.com</li>
										<li> Select Insure Now (listed under the headline “Instant Shipping Insurance Protection).</li>
										<li>Register an account or opt to Insure My Shipment as a Guest.</li>
										<li>Enter your shipment details.</li>
										<li>Provide your payment information.</li>
									</ul>
									<p className="mt-2">Your shipment is now insured!</p>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</div>

			<div className="py-6 border-t bg-blue-50">
				<div className="flex items-center justify-between mx-auto max-w-7xl">
					<div className="flex items-center gap-4">
						<p className="text-base cursor-pointer text-primary/60 hover:text-blue-700 hover:underline">
							Terms & Conditions
						</p>
						<p className="text-base cursor-pointer text-primary/60 hover:text-blue-700 hover:underline">
							Privacy Policy
						</p>
					</div>
					<span className="text-base text-muted-foreground">© All Rights Reserved {new Date().getFullYear()}</span>
				</div>
			</div>
		</>
	);
};

export default LandingPage;
