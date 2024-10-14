import { MongoClient } from "mongodb"
import jwt from 'jsonwebtoken'
import { secretToken } from '../constants.ts'
import { BTask, ITask } from "src/@types/task";
import { TRes, TReq } from "src/@types/server";

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const col = client.db("public").collection("tasks");


/***** Verification function for tokenaccess return _id-User from DB *****/
function verifyToken(accessToken: string, secretToken: string): string{
    let token = jwt.verify(accessToken, secretToken);
    return JSON.stringify(token);        // ._id
}

/***** *****/

/***** Add New Task *****/
export const addNewTask : any = async(req: TReq, res: TRes) => {
    const accessToken = req.headers.accesstoken;
    const userId: string = JSON.parse(verifyToken(accessToken, secretToken)).userId;
    if(!userId){
        return res
                .status(401)
                .json({message: 'Unauthorized!'});
    }

    // req.body va avea description, status, si id
    const task : BTask = {userId : userId, ...req.body}
    await col.insertOne(task).catch(
        () => res
                    .status(405)
                    .json({message: "Error-BE: user don't find."})
    );

    return res.status(200).json({message: "Task added with success!", tasks: task})
}

/***** *****/

/***** List of tasks *****/
export const listOfTasks : any = async(req : TReq, res : TRes) => {
    const accessToken : string= req.headers.accesstoken;
    const userId: string = JSON.parse(verifyToken(accessToken, secretToken)).userId;
    
    if(!userId){
        return res
            .status(401)
            .json({message: 'Unauthorized!'});
    }

    const tasks: ITask[] = await col.find({userId: userId}, {projection:{ _id: 0, userId: 0 }}).toArray().catch(
            () => res
                        .status(405)
                        .json({error: "Something went wrong!"})
    );

    return res.status(200).json({tasks: tasks})
}

/***** *****/

/***** Update task *****/

/***** *****/

/***** Delete task *****/
export const deleteTask: any = async(req: TReq, res: TRes) => {
    const accessToken = req.headers.accesstoken;
    const userId: string = JSON.parse(verifyToken(accessToken, secretToken)).userId;

    if(!userId){
        return res
        .status(401)
        .json({message: 'Unauthorized!'});
    }
    
    const id: string = req.query.id;
    await col.deleteOne({id : id}).catch(
        () => res
                    .status(405)
                    .json({message: "Error-BE: user don't find."})
    );

    return res.status(200).json({message: 'The task was deleted!'})
}

/***** *****/