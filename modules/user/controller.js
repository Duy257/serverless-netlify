import { User } from "../../model/user"
export const userController = async (event) => {
  switch (event.httpMethod) {
    case "GET":
      if (event.path === ('/api/user/find-one')) return await fetchOne(event)
      break
    default:
      throw new Error(`Unsupported method "${event.httpMethod}"`)
  }
}

const fetchOne = async (event) => {
  try {
    const id = event.queryStringParameters.id
    if (!id)
      throw Error("Thiếu Id")
    const user = await User.findById(id);
    if (!user) throw Error("User không tồn tại")
    delete user._doc.password
    return {
      statusCode: 200,
      body: JSON.stringify({
        user
      })
    }
  } catch (error) {
    throw error
  }
}