import { auth } from "../../middleware/auth"
import { authController } from "../../modules/auth/controller"
import { userController } from "../../modules/user/controller"
import dataSource from "../../plugin/data-source"

export const handler = async (event, context) => {
    await auth(event)
    await dataSource.connect()
    let response = {}
    switch (event.httpMethod) {
        case "GET":
            if (event.path === ('/api/user/find-one')) response = await userController(event)
            break
        default:
            throw new Error(`Unsupported method "${event.httpMethod}"`)
    }
    return response
}