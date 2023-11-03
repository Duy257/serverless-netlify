import mongoose from "mongoose";

class DataSource {
  async connect() {
    console.log("start connect");
    try {
      await mongoose.connect(process.env.DB_URL);
      console.log("connected success");
    } catch (error) {
      throw Error("connect db failure")
    }
  }
}

export default new DataSource();
