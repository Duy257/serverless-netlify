import { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  avatar: String,
});

const User = model("Users", userSchema);
export { User };
