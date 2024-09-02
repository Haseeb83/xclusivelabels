// Get All admin notifications handler

import { Model } from "@lib/model"
import { notifications } from "@schemas/notifications"
import { subscriptions } from "@schemas/subscriptions"
import { and, eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { Context } from "hono"


const Get = async (c: Context<App>) => {
    try {

        const user_id = c.get("jwtPayload").id

        const data = await drizzle(c.env.DB).select().from(notifications).where(eq(notifications.user_id, user_id)).orderBy(eq(notifications.created_at, "asc")).limit(50).all()
        return c.json(data)
    } catch (error: any) {
        return c.json({ error: error.message })
    }
}
const MarkAsRead = async (c: Context<App>) => {
    try {
        const user_id = c.get("jwtPayload").id
        const model = new Model(c.env.DB)
        const data = await model.update(notifications, { read: true }, eq(notifications.user_id, user_id))
        return c.json(data) // Remove the argument from the json() method call
    } catch (error: any) {
        return c.json({ error: error.message })
    }
}
const Subscribe = async (c: Context<App>) => {

    try {
        // get all the data from the request and log it
        const body = await c.req.json();
        // get the user id from the jwt payload
        const user_id = c.get("jwtPayload").id

        const token = body.token

        const model = new Model(c.env.DB)
        await model.insert(subscriptions, { user_id, token: token })
        return c.json({ message: "Subscribed" })
    } catch (error: any) {
        return c.json({ error: error.message })
    }
}
const Unsubscribe = async (c: Context<App>) => {
    // update is_active to false
    try {
        const user_id = c.get("jwtPayload").id
        const model = new Model(c.env.DB)
        const data = await model.update(subscriptions, { is_active: false }, eq(subscriptions.user_id, user_id))
        return c.json(data)
    } catch (error: any) {
        return c.json({ error: error.message })


    }
}

const subscriptionStatus = async (c: Context<App>) => {
    console.log("subscriptionStatus")
    try {
        const user_id = c.get("jwtPayload").id
        const model = new Model(c.env.DB)
        const data = await model.get(subscriptions, and(eq(subscriptions.user_id, user_id), eq(subscriptions.is_active, true)))

        return c.json(data)
    } catch (error: any) {
        return c.json({ error: error.message })
    }

}


const AdminNotification = { Get, MarkAsRead, Subscribe, Unsubscribe, subscriptionStatus }

export { AdminNotification }


