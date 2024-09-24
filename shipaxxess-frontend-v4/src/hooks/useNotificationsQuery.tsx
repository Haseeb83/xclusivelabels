import { api } from "@client/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";


const isAdminPath = () => {
	return window.location.pathname.startsWith("/admin");
};

const getNotificationsUrl = () => {
	return isAdminPath() ? "/admin/notifications" : "/user/notifications";
};


export const useNotificationsQuery = () => {
	return useQuery({
		queryKey: ["notifications"],
		queryFn: async () => {
			const res = await api.url(getNotificationsUrl()).useAuth().get();
			const data = await res.json() as any;
			if (data.error) {
				throw new Error(data.error);
			}
			//  sort the notifications by created_at in descending order
			data.sort((a: any, b: any) => {
				return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
			});


			return data;



		},
	});
};

// mutation to mark notification as read

// invkae this function to mark all notifications as read
export const useMarkAsReadMutation = () => {

	// refetch the notifications query after marking all as read

	return useMutation({
		mutationKey: ["mark-as-read"],
		mutationFn: async () => {
			const res = await api.url(getNotificationsUrl()).useAuth().patch({});
			const data = await res.json() as any;
			if (data.error) {
				throw new Error(data.error);
			}
			return data;


		},


		onSuccess: () => {
			// new QueryClient().invalidateQueries({ queryKey: ["notifications"] });
		},
	});
};