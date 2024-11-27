const db = require("../utils/db")
const User = require("../models/userModel")

// สร้างฟังก์ชันในการอ่านข้อมูลผู้ใช้ทั้งหมดออกมา
const getAllUsers = async () => {
    const client = await db.connect() //เชื่อมต่อฐานข้อมูล
    const result = await client.query("SELECT * FROM public.user") //ดึงข้อมูลจากตาราง user
    
    client.release() //ปิดการเชื่อมต่อฐานข้อมูล

    // if (result.rows.length > 0) {
    //     const {id, firstname, lastname, email, phone} = result.rows[0]
    //     return new User(id, firstname, lastname, email, phone)
    // } else {
    //     return null
    // }   

    return result.rows.map(user => new User(
        user.id, 
        user.firstname, 
        user.lastname, 
        user.email, 
        user.phone))
}

module.exports = {
    getAllUsers
}