import express from 'express'
import connectDB from './db/db';
const app = express();


connectDB();

app.use(express.json());


export default app