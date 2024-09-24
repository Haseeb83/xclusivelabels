import React from "react";
import "@client/styles/index.css";
import { router } from "./routes";
import ReactDOM from "react-dom/client";
import { Toaster, toast } from "sonner";
import { RouterProvider } from "react-router-dom";
import { TimezoneProvider } from "@client/contexts/timezone";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			toast.error((error as Error).message);
		},
	}),
});


ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<TimezoneProvider>
				<RouterProvider router={router} />
			</TimezoneProvider>
			<Toaster richColors />
		</QueryClientProvider>
	</React.StrictMode>,
);
