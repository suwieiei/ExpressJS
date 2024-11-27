const express = require("express");

//import db
const db = require("../utils/db")

//create router
const router = express.Router();

//ทดสอบการเชื่อมฐานข้อมูล postgressql
router.get("/testdb", async (req, res) => {
    try {
        const client = await db.connect() //เชื่อมต่อฐานข้อมูล
        const result = await client.query("SELECT * FROM public.user") //ดึงข้อมูลจากตาราง user
        res.send(result.rows)
    } catch (error) {
        console.log(error)
    }
})


//create route
router.get("/", (req, res) => {
    res.send("Hello SUWI")
})

router.get("/about", (req, res) => {
    res.send("About SUWI")
})

router.post("/product", (req, res) => {
    res.send("Product SUWI SUWI SUWI")
})

router.put("/product", (req, res) => {
    res.send("EDIT SUWI SUWI SUWI")
})

router.delete("/product", (req, res) => {
    res.send("DELETE SUWI SUWI SUWI")
})

module.exports = router