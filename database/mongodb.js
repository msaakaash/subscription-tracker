import mongoose from 'mongoose';
 
import { DB_URI } from '../config/env.js'


if(!DB_URI){
    throw new Error("Please define the MONGODB_URI environment variable inside .env<developmen/production>.local")
}

//CONNECTING TO DB

const connectToDatabase = async() => {
    try{
        await mongoose.connect(DB_URI);
        console.log(`Connect to database`);
        
        
    }catch(error){
        console.error("Error connecting to database: ",error);
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
}

export default connectToDatabase;