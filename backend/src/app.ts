import express from 'express'
import connectDB from './db/db';
import repoRoute from './route/repo.route';
const app = express();


connectDB();

app.use(express.json());
app.use("/api/repo",repoRoute)


export default app