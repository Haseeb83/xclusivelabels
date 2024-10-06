import { Hono } from "hono";
import { AddressesUser } from "./addresses";
import { DashboardUser } from "./dashboard";
import { EbayUser } from "./ebay";
import { LabelsUser } from "./labels";
import { UserNotification } from "./notification";
import { PackagesUser } from "./packages";
import { PaymentUser } from "./payment";
import { ReferralsUser } from "./referrals";
import { SettingsUser } from "./settings";
import { StatusUser } from "./status";
import { StoreUser } from "./stores";
import { TicketsUser } from "./tickets";
import { TypeUser } from "./types";
import { WeightsUser } from "./weights";
import { CouponsAdmin } from "@api/admin/coupon";
import { DiscountAdmin } from "@api/admin/discount";
const user = new Hono<App>();

// Status routes
user.get("/status", StatusUser);

// Dashboard routes

// Labels routes
user.post("/labels/download", LabelsUser.DownloadSingle);
user.post("/labels/refund", LabelsUser.RefundAsSingle);

user.get("/labels/batch", LabelsUser.GetAll);
user.post("/labels/singleLabel", LabelsUser.CreateSingle);
user.post("/labels/batch", LabelsUser.Create);

user.post("/labels/batch/download", LabelsUser.DownloadBatch);
user.get("/labels/batch/:uuid", LabelsUser.Get);
user.post("/labels/batch/refund", LabelsUser.RefundAsBatch);
user.post("/labels/batch/search", LabelsUser.Search);

// Addresses routes
user.get("/addresses", AddressesUser.GetAll);
user.post("/addresses", AddressesUser.Create);
user.patch("/addresses", AddressesUser.Edit);
user.delete("/addresses", AddressesUser.Delete);
user.get("/addresses/:uuid", AddressesUser.Get);

// Packages routes
user.get("/packages", PackagesUser.GetAll);
user.post("/packages", PackagesUser.Create);
user.patch("/packages", PackagesUser.Edit);
user.delete("/packages", PackagesUser.Delete);
user.get("/packages/:uuid", PackagesUser.Get);

// Payments routes
user.get("/payments", PaymentUser.Get);
user.post("/payments", PaymentUser.Create);
user.get("/payments/gateway", PaymentUser.Getway);

// Tickets routes
user.get("/tickets", TicketsUser.Get);
user.post("/tickets", TicketsUser.Create);
user.get("/tickets/:ticket_id", TicketsUser.Find);
user.post("/tickets/:ticket_id", TicketsUser.PostMessage);

// Referral routes
user.get("/referrals", ReferralsUser.Get);

// Stores routes
user.get("/stores", StoreUser.GetAll);
user.get("/stores/ebay/init", EbayUser.Init);
user.get("/stores/ebay/callback", EbayUser.Callback);
user.get("/stores/ebay/fetch", EbayUser.FetchOrders);
user.post("/stores/ebay/batch", EbayUser.StoreAsBatch);

// Settings routes
user.get("/settings", SettingsUser.Get);
user.post("/settings/profile", SettingsUser.Profile);
user.post("/settings/notifications", SettingsUser.Notifications);
user.post("/settings/coupon", SettingsUser.Coupon);

// Weights routes
user.post("/weights", WeightsUser.Post);
// Discount routes
user.get("/discounts", DiscountAdmin.GetAll);
// coupon routes
user.get("/couponsByCode/:code", CouponsAdmin.GetCouponByCode);

// Types routes
user.get("/types", TypeUser.GetAll);
// retunrn all user notifcations
user.get("/notifications", UserNotification.Get);
// mark all user notifcations as read
user.patch("/notifications", UserNotification.MarkAsRead);
// subscribe user to push notifications
user.post("/subscribe", UserNotification.Subscribe);
// unsubscribe user from push notifications
user.delete("/unsubscribe", UserNotification.Unsubscribe);
// get subscription status
user.get("/subscription", UserNotification.subscriptionStatus);
// user dashboard
user.get("/dashboard", DashboardUser.Get);

export { user };