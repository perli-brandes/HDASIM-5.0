import axios from "axios";





export const supplierLogInAPI = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:8080/api/supplier/logIn', credentials);
       
        return response.data; 
    } catch (error) {
       
        if (error.response && error.response.status === 401) {
            throw new Error("Incorrect password. Please try again."); 
        } else if (error.response && error.response.status === 404) {
            throw new Error("wrong phone"); 
        } else {
            throw new Error("שגיאה בהתחברות: " + error.message);
        }
    }
};




export const getSuppliersAPI= async() =>{
    return await axios.get('http://localhost:8080/api/supplier/getSuppliers')

}



export const addSupplierAPI= async(supplier) =>{
    return await axios.post('http://localhost:8080/api/supplier/add',supplier)

    
}

