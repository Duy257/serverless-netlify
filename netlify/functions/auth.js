import { authController } from "../../modules/auth/controller"
import { userController } from "../../modules/user/controller"
import dataSource from "../../plugin/data-source"

export const handler = async (event, context) => {
    await dataSource.connect()
    let response = {}
    switch (event.httpMethod) {
        case "POST":
            if (event.path === ('/api/auth/register')) response = await authController(event)
            if (event.path === ('/api/auth/signin')) response = await authController(event)
            if (event.path === ('/api/auth/refresh')) response = await authController(event)
            break
        case "GET":
            if (event.path === ('/api/user/find-one')) response = await userController(event)
            break
        default:
            throw new Error(`Unsupported method "${event.httpMethod}"`)
    }
    return response
}