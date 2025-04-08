import axios from "axios";

export const getProductsAPI= async() =>{
    return await axios.get('http://localhost:8080/api/products/getProducts')

}



export const addProductAPI= async(product) =>{
    return await axios.post('http://localhost:8080/api/products/addProduct',product)

    
}

