import { userController } from "../../modules/user/controller"
import dataSource from "../../plugin/data-source"

export const handler = async (event, context) => {
    await dataSource.connect()
    let response = {}
    switch (event.httpMethod) {
        case "POST":
            if (event.path === ('/api/handle/auth/register')) response = await userController(event)
            break
        default:
            throw new Error(`Unsupported method "${event.httpMethod}"`)
    }
    return response
}