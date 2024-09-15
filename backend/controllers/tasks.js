import mongodb, { MongoClient } from "mongodb"
import uuid4 from "uuid4";

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const col = client.db("private").collection("users");
const { ObjectId } = mongodb;


export const addNewTask = async(req,res) => {
    // modifica lista de tasks a userului
    
    const { "task" : newTask} = req.body;
    const id = req.query.id;

    try{
        const user = await col.findOne({_id : new ObjectId(id)});
        console.log(newTask)
        
        await col.updateOne({_id : new ObjectId(id)}, {$set : { tasks : [...user.tasks, {text : newTask, id: uuid4()}]}})
        res.status(200).json({message: "Task added with success!"})
    }catch(error){
        res.status(405).json({error: "Something went wrong!"})
    }
}

export const listOfTasks = async(req, res) => {

    const id = req.query.id;

    try{
        const user= await col.findOne({_id : new ObjectId(id)})
        console.log("USER:", user)
        
        res.status(200).json({tasks: [...user.tasks]})
    }catch(error){
        res.status(405).json({error: "Something went wrong!"})
    }

}