import { userController } from "../../modules/user/controller"
import dataSource from "../../plugin/data-source"

export const handler = async (event, context) => {
    await dataSource.connect()
    switch (event.httpMethod) {
        case "POST":
            if (event.path === ('/api/handle/auth/register')) return await userController(event)
            break
        default:
            throw new Error(`Unsupported method "${event.httpMethod}"`)
    }
}