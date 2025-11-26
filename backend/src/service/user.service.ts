import { Response } from "express";
import { redis } from "../utils/redis";

export const getUserId = async(id:string,res:Response) =>{
    const userjson = await redis.get(id) as string

    if(userjson){
        const user = JSON.parse(userjson)
        res.status(201).json({
            success:true,
            user
        })
    }
}