import mongodb, { MongoClient } from "mongodb"

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const col = client.db("private").collection("users");
const { ObjectId } = mongodb;


export const addNewTask = async(req,res) => {
    // modifica lista de tasks a userului

    const { "task" : newTask} = req.body;
    const userID = req.query.userID;
    try{
        const user = await col.findOne({_id : new ObjectId(userID)});
        console.log(newTask)
        
        await col.updateOne({_id : new ObjectId(userID)}, {$set : { tasks : [...user.tasks, {text : newTask, completeTask: false}]}})
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

export const completeTask = async(req, res) => {

    const {idUser, idTask}= req.params;

    try{
        await col.updateOne(
            { _id: new ObjectId(idUser) },
            { $set: { "tasks.$[elem].completeTask":  true} },
            { arrayFilters: [ { "elem.id":  idTask} ] }
          )
    }catch(error){
        res.status(405).json({message: "Can't update task!"})
    }
}

export const deleteTask = async(req, res) => {

    const data = req.query;

    try {
        console.log(req.query)
        await col.updateOne(
            { _id: new ObjectId(data.userID) },
            { $pull: { "tasks": { "text": data.task } } }
        );
          
        res.status(200).json({message: 'The task was deleted!'})
    } catch (error) {
        res.status(405).json({message: "Can't delete task!"})
    }
}