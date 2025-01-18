import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"



const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())



app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))



import userRouter from "./routes/user.route.js"
import cartRouter from "./routes/cart.route.js"
import restRouter from "./routes/restorent.route.js"
import itemRouter from "./routes/item.route.js"




app.use("/api/v1/users",userRouter)
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/rest",restRouter)
app.use("/api/v1/item",itemRouter)



export default app