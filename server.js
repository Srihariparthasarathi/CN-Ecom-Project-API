// OM NAMASIVAYA
import express from "express"

//routs
import productRouter from "./src/features/products/products.router.js"

const server = express();

//routing through middleware
server.use("/api/products", productRouter)


//initial setep
server.get("/", (req, res)=>{
    res.send("hello world");
})


export default server;