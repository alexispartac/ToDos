import axios from "axios";

const GET_DATA_URL = "http://localhost:8080/tasks";

export const getTasks = async(userToken : string)  => {
    try {
        const response = await axios.get(GET_DATA_URL, 
            {
                headers : {
                    accessToken: userToken
                }
            }
        );
        
        return response.data.tasks
        
    }catch(error : any) {
        if (!error.response) {
            console.log('Network error:', error);
        } else {
            console.log('Error response:', error);
        }
    }

    
};
