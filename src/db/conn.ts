import mongoose from "mongoose"
require('dotenv').config()


const DB_URL = process.env.DB_URL as string;
if(!DB_URL) throw new Error("DB_URL undefined.");

const db = {
    connect: async (): Promise<void> => {
        try {
            await mongoose.connect(DB_URL)

            console.log('Connected to MongoDB')
        } catch (error) {
            console.log('Error connecting to MongoDB', error)
        }
    }
}


export default db;
