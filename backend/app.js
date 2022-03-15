const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./Middleware/error");
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

app.use(express.json());
app.use(cookieParser());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload())

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

module.exports = app;
