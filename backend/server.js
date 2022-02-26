const app = require('./App');
const connectDB = require('./Db/connectDB')


process.on("uncaughtException",(err)=>{
    console.log(`Error:${err}`);
    console.log("Shuting down the server");
    process.exit(1)
    
})
require('dotenv').config({path:'./backend/config/.env'});


const Port = process.env.PORT;
const start = async ()=>{
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI);
        const server = app.listen(Port, console.log(`Server is listening at port ${Port}`));
    } catch (error) {
        console.log(error);
    }
}
start();

//unhandled error
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err}`);
    console.log("Shuting down the server due to unhandledRejection");
    process.exit(1)
    
})

module.exports = app;