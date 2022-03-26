const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./Middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require('path');
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/.env" });
  }
app.use(express.json({ limit: "50mb" }));
app.use(fileUpload({
    limits: {
        fileSize: 80000000 //80mb
    },
    abortOnLimit: true
 }));
app.use(cookieParser());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
const product = require("./Routes/ProductRoute");
const artist = require("./Routes/ArtistRoute");
const admin = require("./Routes/AdminRoutes");
const user = require("./Routes/UserRoute");
const wishList = require("./Routes/WishListRoute");

app.use("/api/v1", product);
app.use("/api/v1/artist", artist);
app.use("/api/v1/admin", admin);
app.use("/api/v1/user", user);
app.use("/api/v1/wishlist", wishList);
app.use(errorMiddleware);
app.use(express.static(path.join(__dirname,"../frontend/build")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})
module.exports = app;
