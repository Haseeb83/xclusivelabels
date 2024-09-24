import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createBrowserRouter } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';

// User Layout & Routes
import UserLayout from "./components/layouts/user";
import AddressRoutes from "@client/modules/addresses_user/routes";
import SignupRoutes from "@client/modules/signup_user/routes";
import SigninRoutes from "@client/modules/signin_user/routes";
import DashboardUserRoutes from "@client/modules/dashboard_user/routes";
import PackagesRoutes from "@client/modules/packages_user/routes";
import PaymentsRoutes from "@client/modules/payments_user/routes";
import ReferralsRoutes from "@client/modules/referrals_user/routes";
import SettingsRoutes from "@client/modules/settings_user/routes";
import TickersRoutes from "@client/modules/tickets_user/routes";
import StoresRoutes from "@client/modules/stores_user/routes";
import BatchsRoutes from "@client/modules/batches_user/routes";
import LandingRoutes from "@client/modules/landing_page/routes";

// Admin Layout & Routes
import AdminLayout from "./components/layouts/admin";
import SettingsAdminRoutes from "@client/modules/settings_admin/routes";
import CronsAdminRoutes from "@client/modules/crons_admin/routes";
import UsersAdminRoutes from "@client/modules/users_admin/routes";
import TicketsAdminRoutes from "@client/modules/tickets_admin/routes";
import PaymentsAdminRoutes from "@client/modules/payments_admin/routes";
import WeightsAdminRoutes from "@client/modules/weights_admin/routes";
import TypesAdminRoutes from "@client/modules/types_admin/routes";
import BatchsAdminRoutes from "@client/modules/batches_admin/routes";
import RefundAdminRoutes from "@client/modules/refunds_admin/routes";
import DashboardAdminRoute from "@client/modules/dashboard_admin/routes";

// Error Fallback Component
interface ErrorFallbackProps {
	error: Error;
	resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
	<div className="min-h-screen container flex items-center justify-center bg-gray-100">
		<div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
			<h2 className="text-xl font-semibold text-red-600 mb-4">Something went wrong</h2>
			<p className="text-gray-700">{error.message}</p>
			<button
				onClick={resetErrorBoundary}
				className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
			>
				Try again
			</button>
		</div>
	</div>
);

// Receipt Module Route
import ReceiptModule from './modules/ReceiptModule';

const AppRoutes1 = () => (
	<Router>
		<Routes>
			<Route path="/receipts" element={<ReceiptModule />} />
		</Routes>
	</Router>
);

// Label Module Route
import LabelModule from './modules/LabelModule';

const AppRoutes2 = () => (
	<Router>
		<Routes>
			<Route path="/labels/:customerId" element={<LabelModule />} />
		</Routes>
	</Router>
);

// Combined Application Routes
export const router = createBrowserRouter([
	...LandingRoutes,
	...SignupRoutes,
	...SigninRoutes,
	{
		path: "/*",
		element: (
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<UserLayout />
			</ErrorBoundary>
		),
		children: [
			...AddressRoutes,
			...DashboardUserRoutes,
			...PackagesRoutes,
			...PaymentsRoutes,
			...ReferralsRoutes,
			...SettingsRoutes,
			...TickersRoutes,
			...StoresRoutes,
			...BatchsRoutes,
		],
	},
	{
		path: "/admin/*",
		element: (
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<AdminLayout />
			</ErrorBoundary>
		),
		children: [
			...SettingsAdminRoutes,
			...CronsAdminRoutes,
			...UsersAdminRoutes,
			...TicketsAdminRoutes,
			...PaymentsAdminRoutes,
			...WeightsAdminRoutes,
			...TypesAdminRoutes,
			...BatchsAdminRoutes,
			...RefundAdminRoutes,
			...DashboardAdminRoute,
		],
	},
]);

export default { AppRoutes1, AppRoutes2 };
