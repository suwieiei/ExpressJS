const db = require("../utils/db")
const product = require("../models/productModel")

// สร้างฟังก์ชันในการอ่านข้อมูลสินค้าทั้งหมดออกมา
const getAllProducts = async () => {
    const client = await db.connect() //เชื่อมต่อฐานข้อมูล
    const result = await client.query("SELECT * FROM public.product ORDER BY id DESC") //ดึงข้อมูลจากตาราง user
    
    client.release() //ปิดการเชื่อมต่อฐานข้อมูล 

    return result.rows.map(user => new product(
        user.id, 
        user.name, 
        user.price, 
        user.qty, 
        user.createdate
    ))   
}

// สร้างฟังก์ชันในการอ่านข้อมูลสินค้าทั้งหมดออกมา
const getProductById = async (id) => {
    const client = await db.connect() //เชื่อมต่อฐานข้อมูล
    const result = await client.query("SELECT * FROM public.product WHERE id = $1" , [id]) //ดึงข้อมูลจากตาราง user
    
    client.release() //ปิดการเชื่อมต่อฐานข้อมูล 

    return result.rows.map(user => new product(
        user.id, 
        user.name, 
        user.price, 
        user.qty, 
        user.createdate
    ))   
}

// สร้างฟังก์ชันในการเพิ่มข้อมูลสินค้าใหม่
const addProduct = async (name, price, qty) => {
    const client = await db.connect() //เชื่อมต่อฐานข้อมูล
    const result = await client.query
    ("INSERT INTO public.product (name, price, qty) VALUES ($1, $2, $3) RETURNING *", [name, price, qty])

    client.release() //ปิดการเชื่อมต่อฐานข้อมูล    

    return new product(
        result.rows[0].id, 
        result.rows[0].name, 
        result.rows[0].price, 
        result.rows[0].qty, 
        result.rows[0].createdate)
}

// สร้างฟังก์ชันสำหรับการแก้ไขข้อมูลสินค้า
const updateProduct = async (id, name, price, qty) => {
    const client = await db.connect() //เชื่อมต่อฐานข้อมูล

    const result = await client.query
    ("UPDATE public.product SET name = $1, price = $2, qty = $3 WHERE id = $4 RETURNING *", [name, price, qty, id])

    client.release() //ปิดการเชื่อมต่อฐานข้อมูล    

    return new product(
        result.rows[0].id, 
        result.rows[0].name, 
        result.rows[0].price, 
        result.rows[0].qty, 
        result.rows[0].createdate       
    )
}

// สร้างฟังก์ชันสำหรับการลบข้อมูลสินค้า
const deleteProduct = async (id) => {
    const client = await db.connect() //เชื่อมต่อฐานข้อมูล

    const result = await client.query
    ("DELETE FROM public.product WHERE id = $1 RETURNING *", [id])

    client.release() //ปิดการเชื่อมต่อฐานข้อมูล    

    return new product(
        result.rows[0].id, 
        result.rows[0].name, 
        result.rows[0].price, 
        result.rows[0].qty, 
        result.rows[0].createdate       
    )
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}