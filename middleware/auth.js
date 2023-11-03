// Xác minh token
import jwt from "jsonwebtoken";
import { key_access } from "../plugin/config";

export const auth = (event) => {
  let authorization = event.headers.authorization;
  if (authorization) {
    let accessToken = authorization.split(" ")[1];
    if (!accessToken) {
      throw new Error("Error Unauthorized Access");
    } else {
      jwt.verify(accessToken, key_access, (err, data) => {
        if (err) {
          throw new Error(err.message);
        } else {
          return
        }
      });
    }
  } else {
    throw Error("You are anonymous3")
  }
};
