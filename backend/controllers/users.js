import mongodb, { MongoClient } from "mongodb"

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const col = client.db("private").collection("users");
const { ObjectId } = mongodb;



    export const listOfUsers = async(req, res) => {
        try{
        
            const users = await col.find({}).toArray((err, data) => {
                if (err) {
                    res.status(400).json({error: 'Something went wrong!'})
                }
                return res.json(data);
            });

            res.send({users})
        }catch(error){
            res.status(400).json({error: 'Something went wrong!'})
        }
    };

    export const findUser = async(req, res) => {

        const user = req.query;
        console.log(1, user)
        try{
            const findUser = await col.findOne({user: user.username, pwd: user.password});
            if(!findUser)
                res.status(404).json({message: "User don t find!"});
            else 
                res.status(200).json({user:findUser});
            console.log(findUser)
        }catch(error){
            res.status(404).json({error: "Something went wrong!"});
        }

    }

    export const addNewUser = async(req, res) => {

        const newUser = req.body;
    
        try{
    
            await col.insertOne(new Object({...newUser, tasks: []}));
    
            res.send(newUser);
    
        }catch(error){
            res.status(405).json({error: "Something went wrong!"})
        }
    
    }
    
    export const deleteUser = async(req, res) => {
    
        try{
            
            await col.deleteOne({_id : new ObjectId(`${req.headers._id}`)});
    
            res.send({message: 'Success delete!'})
    
        }catch(error){
            res.status(405).json({message: 'Something went wrong!'})
            console.log(error)
        }
    
    } 


