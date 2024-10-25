// OM NAMASIVAYA

export default class ProductModel{
    constructor(id, productName, price, description, imgUrl, category, size){
        this.id = id;
        this.productName = productName,
        this.price = price;
        this.description = description;
        this.imgUrl = imgUrl;
        this.category = category;
        this.size = size;
    }

    static get(){
        return productsList;
    }

    static add(productObj){
        productObj.id = (productsList.length == 0) ? 1 : productsList[productsList.length - 1].id + 1;
        productsList.push(productObj);
        return productObj;

    }

    static getById(id){
        return productsList.find((product) => product.id == id);
    }

    static filter(minPrice, maxPrice, category){
        const products = productsList.filter((product) =>{
            return(!minPrice ||  product.price >= minPrice)&&
            (!maxPrice || product.price <= maxPrice)&&
            (!category ||product.category == category)
        })
        return products
    }
}

const productsList = [
    new ProductModel(1, "pen", 4.99, "smooth writing pen in blue color", "https://tse1.mm.bing.net/th?id=OIP.tPz1_4xSD6FTw0c-F1p-MwHaET&pid=Api&P=0&h=180", "catagory1"),
    new ProductModel(2, "shoe", 1499.99, "snikers with good cosun", "https://tse1.mm.bing.net/th?id=OIP.TqRgd0FAlCJEdKQrIgyqtAHaE8&pid=Api&P=0&h=180", "catagory2", [6,7,8,9,10,11,12])
]