import mongodb, { MongoClient } from "mongodb"
import jwt from 'jsonwebtoken'
import {secretToken} from '../constants.js'

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const col = client.db("private").collection("users");
const { ObjectId } = mongodb;

 
    export const listOfUsers = async(req, res) => {

        const adminId = req.headers.adminId;

        if(adminId === 'onlyadmin')
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

    export const loginUser = async(req, res) => {

        const {username, password} = req.body;

        const userWithUsername = await col.findOne({user: username}).catch( 
            (error) => res
                        .status(400)
                        .json({error: `Error-BE: ${error}`})              
        );

        if(!userWithUsername)
            return res
                .status(400)
                .json({message: "Username or password doesn't match!"});

        if(!userWithUsername.pwd === password)
            return res
                .status(400)
                .json({message: "Username or password doesn't match!"});

        delete userWithUsername.pwd;
        // add token jwtToken in loc de x-userId
        const token = jwt.sign(userWithUsername, secretToken, {expiresIn: "60d"})
        console.log("aici", typeof token);
        return res.status(200).json({message: "Succes!", accessToken: token})

    }

    export const registerUser = async(req, res) => {

        const newUser = req.body;

        await col.insertOne(new Object({...newUser, tasks: []})).catch(
            (error) => res
                    .status(400)
                    .json({error: `Error-BE: ${error}`})              
        );

        return res.status(200).json({newUser});

    }
    
    export const deleteUser = async(req, res) => {
    
        const adminId = req.headers.adminId;
        const userId = req.query.userId;

        if(adminId === 'onlyadmin')
            return res
                    .status(401)
                    .json({message: 'Unauthorized!'})


            
        await col.deleteOne({_id : new ObjectId(`${userId}`)}).catch(
            (error) => res
                    .status(400)
                    .json({error: `Error-BE: ${error}`})              
        );

        return res.status(200).json({message: 'Success delete!'})

    } 


