const app = require("./app");
const connectDB = require("./Db/connectDB");
const cloudinary = require("cloudinary");
process.on("uncaughtException", (err) => {
  console.log(`Error:${err}`);
  console.log("Shuting down the server");
  process.exit(1);
});
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/.env" });
}

const Port = process.env.PORT;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONGO_URI);
    const server = app.listen(
      Port,
      console.log(`Server is listening at port ${Port}`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();


//unhandled error
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err}`);
  console.log("Shuting down the server due to unhandledRejection");
  process.exit(1);
});

module.exports = app;
