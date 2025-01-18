import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config()


const MONGOURL=process.env.MONGOURL
const PORT=process.env.PORT





mongoose.connect(MONGOURL).then(()=>{
    console.log(`\n\t\t----->DataBase Conection successfull<------`)
    try {
        app.listen(PORT,()=>{
            console.log(`\t\tServer is running on http://localhost:${PORT}\n`)
        })
    } catch (err) {
        console.log(`Getting Error While Conecting to SERVER`)
    }
}).catch((err)=>{
    console.log(`Getting Error While Conecting to DataBase`)
})



