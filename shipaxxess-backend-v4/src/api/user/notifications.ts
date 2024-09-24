import { Model } from "@lib/model";
import { notifications } from "@schemas/notifications";
import { eq } from "drizzle-orm";
import { Context } from "hono";
import { v4 } from "uuid";

export interface INotification {
    title: string;
    description: string;
}

// Get all notifications for a user
const Get = async (c: Context<App>) => {
    const model = new Model(c.env.DB);
    const data = await model.all(notifications, eq(notifications.user_id, c.get("jwtPayload").id));
    return c.json(data);
};

// Add a new notification
const Add = async (notification: INotification, db: D1Database, user_id: number) => {
    const model = new Model(db);
    const data = await model.insert(notifications, {
        title: notification.title,
        description: notification.description,
        uuid: v4(),
        user_id: user_id,
    });

    console.log('Notification added:', data);
};

// Mark all notifications as read
const MarkAllRead = async (c: Context<App>) => {
    const model = new Model(c.env.DB);
    const data = await model.update(
        notifications,
        { read: true },
        eq(notifications.user_id, c.get("jwtPayload").id)
    );
    return c.json(data);
};

// Function to send notifications based on user actions
const sendUserNotification = async (db: D1Database, user_id: number, action: string) => {
    let notification: INotification;

    switch (action) {
        case "label_ready":
            notification = { title: "Shipping Label Ready", description: "Your shipping label is ready to download." };
            break;
        case "refund_completed":
            notification = { title: "Refund Completed", description: "Your refund has been completed." };
            break;
        case "topup_balance_added":
            notification = { title: "Top-up Balance Added", description: "Your top-up balance has been added." };
            break;
        case "topup_balance_denied":
            notification = { title: "Top-up Balance Denied", description: "Your top-up balance request was denied." };
            break;
        case "support_ticket_response":
            notification = { title: "Support Ticket Response", description: "You have received a response to your support ticket." };
            break;
        default:
            return;
    }

    await Add(notification, db, user_id);
};

// Export NotificationUsers handlers
const NotificationUsers = { Get, Add, MarkAllRead, sendUserNotification };
export { NotificationUsers };


