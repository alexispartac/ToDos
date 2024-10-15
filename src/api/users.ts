import { MongoClient, ObjectId } from "mongodb"
import jwt from 'jsonwebtoken'
import { secretToken } from '../../src/constants.ts'
import { URes, UReq } from "src/@types/server";
import { User } from "src/@types/user";

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const col = client.db("private").collection("users");


/***** List of users *****/
export const listOfUsers: any = async(req: UReq, res: URes) => {
    const adminId : string = req.headers.adminid;

    if(adminId !== 'onlyadmin')
        return res
                .status(401)
                .json({message: 'Unauthorized!'})


    const users = await col.find({}).toArray().catch(
        (error) => res
                    .status(400)
                    .json({error: `Error-BE: ${error}`})              
    );

    return res.status(200).json({users});

};
/***** *****/

/***** Login user *****/
export const loginUser: any = async(req: UReq, res: URes) => {
    const {username , password }: User = req.body;
    
    const User = await col.findOne({user: username}).catch( 
        (error) => res
                    .status(400)
                    .json({error: `Error-BE: ${error}`})              
    );                                                                      
    
    if(!User)
        return res
            .status(400)
            .json({message: "Username or password doesn't match!"});

    if(User.pwd !== password)
        return res
            .status(400)
            .json({message: "Username or password doesn't match!"});

    
    delete User.pwd;
    
    const token = jwt.sign({userId: User._id.toString()}, secretToken, {expiresIn: "60d"})
    
    return res.status(200).json({message: "Succes!", accessToken: token})

};
/***** *****/

/***** Register user *****/
export const registerUser: any = async(req: UReq, res: URes) => {

    const newUser: User = req.body;

    await col.insertOne(newUser).catch(
        (error) => res
                .status(400)
                .json({error: `Error-BE: ${error}`})              
    );

    return res.status(200).json({newUser});

};
/***** *****/

/***** Delete user *****/
export const deleteUser: any = async(req: UReq, res: URes) => {
    
    const adminId = req.headers.adminid;
    const userId = req.query.userId;

    if(adminId !== 'onlyadmin')
        return res
                .status(401)
                .json({message: 'Unauthorized!'})


    await col.deleteOne({_id : new ObjectId(`${userId}`)}).catch(
        (error) => res
                .status(400)
                .json({error: `Error-BE: ${error}`})              
    );

    return res.status(200).json({message: 'Success delete!'})

};
/***** *****/


