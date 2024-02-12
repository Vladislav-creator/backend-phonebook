import { connectDb } from "./db/connectDb.js";
import app from "./app.js";
const {PORT} = process.env;
import dotenv from "dotenv";
dotenv.config()
const  startServer = async () => {
    try{
        await connectDb();
        app.listen(PORT, () => {
            console.log("Server is running. Use our API on port: 8000");
          });
    }catch(error){
        console.log(error);
        procecess.exit(1);
    }
}

startServer();