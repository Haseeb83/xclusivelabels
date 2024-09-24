import { Model } from "@lib/model"
import { notifications } from "@schemas/notifications"



export interface INOtifcation {
    title: string
    description: string
    user_id: number
    uuid: string
}
export const SaveNotifcaiton = async (db: D1Database, notification: INOtifcation) => {

    try {
        const model = new Model(db)
        const data = await model.insert(notifications, { ...notification, })
        console.log("Notifcation added", data)

        return data
    } catch (error: any) {
        console.log("Error", error)
        return { error: error.message }
    }
}

