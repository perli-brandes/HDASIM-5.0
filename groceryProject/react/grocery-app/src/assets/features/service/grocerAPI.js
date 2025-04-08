import axios from "axios";




export const grocerLogInAPI = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:8080/api/grocer/logInGrocer', credentials);
       
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

