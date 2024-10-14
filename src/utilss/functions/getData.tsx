import axios from "axios";

export const getTasks = async(userToken : string)  => {
    try {
        const response = await axios.get("http://localhost:8080/tasks", 
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
