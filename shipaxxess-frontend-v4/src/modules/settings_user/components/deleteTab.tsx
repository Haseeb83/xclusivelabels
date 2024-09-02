import { Alert, AlertDescription, AlertTitle } from "@client/components/ui/alert";
import { Button } from "@client/components/ui/button";
import { Separator } from "@client/components/ui/separator";
import { TabsContent } from "@client/components/ui/tabs";
import { RocketIcon } from "lucide-react";

const SettingsDeleteTab = () => {
	return (
		<TabsContent value="delete" className="space-y-8">
			<div className="w-full">
				<h1 className="text-2xl font-semibold text-primary">Delete Account</h1>
				<span className="text-base text-muted-foreground">You can delete your account from here</span>
			</div>
			<Separator />
			<Alert variant="destructive">
				<RocketIcon className="w-4 h-4" />
				<AlertTitle>Attention!</AlertTitle>
				<AlertDescription>
					Once you delete your account from here, You can&apos;t undo this action later. All your information will be
					gone for forever, it&apos;s include your account credit&apos;s, label&apos;s history, topup&apos;s history
					everything, So please be aware of this. we are sorry to see you go, hope one day you will be back with us
					again. thank you very much
				</AlertDescription>
			</Alert>
			<Button variant="destructive" disabled>
				Delete My Account
			</Button>
		</TabsContent>
	);
};

export default SettingsDeleteTab;
