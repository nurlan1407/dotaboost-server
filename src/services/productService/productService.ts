import { ProductModel } from "@App/interfaces/models/product";

class ProductService{
    async getProducts(serviceId:number){
        const productList = await ProductModel.find().where({serviceId:serviceId});
        return productList
    }
}

export default new ProductService();