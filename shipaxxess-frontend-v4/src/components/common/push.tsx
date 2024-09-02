import Push from "push.js";
import { BellRing } from "lucide-react";
import { useEffect, useState } from "react";
import { Switch } from "@client/components/ui/switch";
import { messaging } from "@client/firebase/firebaseConfig";
import { getToken, deleteToken } from "firebase/messaging";
import { api } from "@client/lib/api";
const { VITE_APP_VAPID_KEY } = import.meta.env;

const PushNotificationComponent = () => {
	const [state, setState] = useState(false);

	async function requestPermission() {
		try {
			const permission = await Notification.requestPermission();
			if (permission === "granted") {
				const token = await getToken(messaging, {
					vapidKey: VITE_APP_VAPID_KEY,
				});

				console.log("Token generated: ", token);
				const path = isAdminPath() ? "/admin/subscribe" : "/user/subscribe";
				await api.url(path).post({ token: token });

				Push.create("Notification", {
					body: "Thanks, now you will receive notifications from us",
					// icon: "/favicon.ico",
				});

				setState(true);
			} else {
				setState(false);
			}
		} catch (error) {
			console.error("Error requesting notification permission: ", error);
			setState(false);
		}
	}
	const isAdminPath = () => {
		return window.location.pathname.startsWith("/admin");
	};
	async function disableNotifications() {
		try {
			const currentToken = await getToken(messaging);
			await deleteToken(messaging);

			// if the logged user is admin it will be admin/notifications else user/notifications
			const path = isAdminPath() ? "/admin/unsubscribe" : "/user/unsubscribe";

			await api.url(path).delete({ token: currentToken });

			setState(false);
		} catch (error) {
			console.error("Error disabling notifications: ", error);
		}
	}

	const handleSwitchChange = async (checked: boolean) => {
		if (checked) {
			console.log("Requesting permission");
			await requestPermission();
		} else {
			console.log("Disabling notifications");
			await disableNotifications();
		}
	};

	useEffect(() => {
		const checkNotificationPermission = () => {

			if (Notification.permission === "granted") {
				setState(true);
			} else {
				setState(false);
			}
		};

		checkNotificationPermission();
	}, []);
	// check if the user has subscation from the server
	useEffect(() => {
		const checkSubscription = async () => {
			const path = isAdminPath() ? "/admin/subscription" : "/user/subscription";
			const data: any = await api.url(path).get();
			console.log("Subscription data: ", data);
			if (data) {
				setState(true);
			}
		};

		checkSubscription();
	}, []);



	return (
		<div className="flex items-center space-x-4 rounded-md border p-4">
			<BellRing />
			<div className="flex-1 space-y-1">
				<p className="text-sm font-medium leading-none">Push Notifications</p>
				<p className="text-sm text-muted-foreground">
					Send notifications to device.
				</p>
			</div>
			<Switch checked={state} onCheckedChange={handleSwitchChange} />
		</div>
	);
};

export default PushNotificationComponent;
