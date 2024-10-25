// OM NAMASIVAYA
// import product model
import ProductModel from "./products.model.js"
export default class ProductController{

    getAllProduct(req, res){
        /** return all products which is retrive using productModel*/
        const products = ProductModel.get()
        res.status(200).send({products: products})
    }

    addProduct(req, res){
        /** return all products which is retrive using productModel*/
        const {productName, price, description, category, size} = req.body;
        const newProduct = {
            productName: productName,
            price: parseFloat(price),
            description: description, 
            imageUrl : req.file.filename,
            category,
            size
        }
        // add product
        const product = ProductModel.add(newProduct)
        res.status(201).send({product: product})
    }

    getProductById(req, res){
        const product = ProductModel.getById(req.params.id)
        if(!product) return res.status(404).send({error : `product not found`})
        res.status(200).send({product: product})
    }

    getFilterProducts(req, res){

        //reutrn filter product imp req.query to get quary data
        const {minPrice, maxPrice, category} = req.query;

        const products = ProductModel.filter(minPrice, maxPrice, category);
        if(products.length == 0)  return res.status(404).send({error : `products not found`});
        res.status(200).send({products: products})
    }
}