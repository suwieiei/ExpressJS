//import express
const express = require("express")

//import cors 
const cors = require("cors")

//import router
const productRouter = require("./routes/productRoutes")
const userRouter = require("./routes/userRoute")
const productRoute = require("./routes/productRoute")

//create an instance of express
const app = express()
app.use(express.json())

// Use Cors
app.use(cors({
    //origin: ["http://itgenius.co.th" , "http://google.com"]
    origin: "*", // สามารถเปิดให้เข้ามาทุกที่ได้ ทุกเว็บไซต์
    methods: ["GET", "POST", "PUT", "DELETE"], //กำหนด method ที่อนุญาตให้ใช้
}))

//use router
app.use("/api/product", productRouter)
app.use("/api/users", userRouter)
app.use("/api/production", productRoute)


//create port 3000
const port = 3000
//start server
app.listen(port, () => {
    console.log(`Server running on port 3000 ${port}`)
})