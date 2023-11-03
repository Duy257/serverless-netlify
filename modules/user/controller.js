import { User } from "../../model/user"
import Base64 from "../../plugin/base64"

export const userController = async (event) => {
  switch (event.httpMethod) {
    case "POST":
      if (event.path === ('/api/handle/auth/register')) return await register(event)
      break
    default:
      throw new Error(`Unsupported method "${event.httpMethod}"`)
  }
}


const register = async (event) => {
  try {
    let { username, email, password } = JSON.parse(event.body) || {}
    if (!username || !email || !password)
      throw Error("Thiếu thông tin")
    const checkUsername = await User.findOne({
      email,
    });
    if (checkUsername) {
      throw Error("Tài khoản đã tồn tại!")
    } else {
      const decodePassword = Base64.decode(password);
      const user = {
        email,
        username,
        password: decodePassword,
      };
      await User.create(user);
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true
        })

      }
    }
  } catch (error) {
    throw error
  }
};