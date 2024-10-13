import http from 'http'
import express from 'express';                         
import bodyParser from 'body-parser';             
import usersRoutes from './backend/routes/usersRoutes.ts';
import tasksRoutes from './backend/routes/tasksRoutes.ts';
import connectDB from "./backend/config/dbConn.ts"
import mongoose from 'mongoose';
import cors from 'cors'


// app
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // permite accesul doar de la această origine
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'], // metodele permise
    allowedHeaders: ['accesstoken', 'Content-Type', 'Authorization'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', usersRoutes);
app.use('/tasks', tasksRoutes);


const PORT = process.env.PORT ?? 8080;

// Connect to MongoDB
connectDB();

// Create server 
const server = http.createServer(app);
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    // Connect to server
    server.listen( PORT , (err? : string) => {
        if (err) {
            console.log("Not connected to server: ", err);
        }
        console.log(`Server running on port: http://localhost:${PORT}`)
    })
})


