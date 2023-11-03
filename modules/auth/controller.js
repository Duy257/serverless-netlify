import { User } from "../../model/user"
import Base64 from "../../plugin/base64"
import { Token } from "../../plugin/token"

export const authController = async (event) => {
  switch (event.httpMethod) {
    case "POST":
      if (event.path === ('/api/handle/auth/register')) return await register(event)
      if (event.path === ('/api/handle/auth/signin')) return await login(event)
      if (event.path === ('/api/handle/auth/refresh')) return await loginWithToken(event)
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

const login = async (event) => {
  const { email, password } = JSON.parse(event.body) || {}
  if (!email || !password)
    throw Error("Thiếu thông tin")
  let user = await User.findOne({
    email: email,
  });
  if (!user) {
    throw Error("Tài khoản hoặc mật khẩu sai")
  } else {
    const decodePassword = Base64.decode(password);
    if (decodePassword === user.password) {
      let payload = {
        username: user.username,
        idUser: user._id,
      };
      const generateToken = Token.sign({ payload });
      return {
        statusCode: 200,
        body: JSON.stringify({
          ...generateToken,
          idUser: user._id,
        })
      }
    } else {
      throw Error("Tài khoản hoặc mật khẩu sai")
    }
  }
}

const loginWithToken = async (event) => {
  try {
    let { refreshToken } = JSON.parse(event.body) || {}
    if (!refreshToken)
      throw Error("Thiếu thông tin")
    const generateToken = Token.refresh({ refreshToken });
    return {
      statusCode: 200,
      body: JSON.stringify({
        ...generateToken,
      })
    }
  } catch (error) {
    throw error;
  }
}