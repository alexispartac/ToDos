import mongodb, { MongoClient } from "mongodb"
import jwt from 'jsonwebtoken'

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const col = client.db("private").collection("users");
const { ObjectId } = mongodb;
const secretToken = '12345'

function verifyToken(accessToken){
    const token = jwt.verify(accessToken, secretToken);
    return token._id;
}


export const addNewTask = async(req,res) => {
    const accessToken = req.headers.userid;
    const userId = verifyToken(accessToken, secretToken)

    if(!userId){
        return res
                .status(401)
                .json({message: 'Unauthorized!'});
    }

    const { "task" : newTask} = req.body;

    const user = await col.findOne({_id : new ObjectId(userId)}).catch(
        (error) => res
                    .status(405)
                    .json({message: "Error-BE: user don't find."})
    );
    
    await col.updateOne(
                        {_id : new ObjectId(userId)}, 
                        {$set : { tasks : 
                            [ ...user.tasks, {text : newTask, completeTask: false} ]
                                }
                        }).catch(
                            (error) => res
                                        .status(405)
                                        .json({message : "Error-BE: don't update the user. The task was not save."})
                        );

    return res.status(200).json({message: "Task added with success!"})
}

export const listOfTasks = async(req, res) => {
    const accessToken = req.headers.userid;
    const userId = verifyToken(accessToken, secretToken);

    if(!userId){
        return res
            .status(401)
            .json({message: 'Unauthorized!'});
    }

    const user= await col.findOne({_id : new ObjectId(userId)}).catch(
        (error) => res
                    .status(405)
                    .json({error: "Something went wrong!"})
    );

    return res.status(200).json({tasks: [...user.tasks]})
}

export const deleteTask = async(req, res) => {
    const accessToken = req.headers.userid;
    const userId = verifyToken(accessToken, secretToken);

    if(!userId){
        return res
        .status(401)
        .json({message: 'Unauthorized!'});
    }
    
    const data = req.query;

    await col.updateOne(
                        { _id: new ObjectId(userId) },
                        { $pull: { "tasks": { "text": data.task } } }
                        ).catch( (error) => res
                                            .status(405)
                                            .json({message: "Can't delete task!"})
    );

    return res.status(200).json({message: 'The task was deleted!'})
}