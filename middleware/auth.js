// Xác minh token
import jwt from "jsonwebtoken";
import { key_access } from "../plugin/config";

export const auth = (req, res, next) => {
  let authorization = req.headers.authorization;
  if (authorization) {
    let accessToken = authorization.split(" ")[1];
    if (!accessToken) {
      throw new Error("Error Unauthorized Access");
    } else {
      jwt.verify(accessToken, key_access, (err, data) => {
        if (err) {
          res.status(401).json({
            error: err.message,
            message: "You are anonymous2",
          });
        } else {
          req.decoded = data;
          next();
        }
      });
    }
  } else {
    res.status(401).json({
      message: "You are anonymous3",
    });
  }
};
