// OM NAMASIVAYA

import express from "express"

// import controller
import ProductController from "./products.controller.js";

//import middelware
import { uplodeImageWithValidator } from "../../middelwares/file-uplode.middleware.js"
import { fileUplodeValidator } from "../../middelwares/validator.middleware.js"

const routes = express.Router();
const productController = new ProductController();

//routes
routes.get("/", productController.getAllProduct)
routes.post("/",uplodeImageWithValidator, fileUplodeValidator,  productController.addProduct)
routes.get("/filter", productController.getFilterProducts)
routes.get("/:id", productController.getProductById)






export default routes;