
// conectare la baza de date mongoDb 

import mongoose from "mongoose";

const URI ="mongodb://localhost:27017/";

export default async function connectDB(){
    try{
        await mongoose.connect(URI);
    }catch(err){
        console.log(err);
    }
}



