import { Response } from "express"
import { ENV } from "../config/ENV"
import { IUser } from "../model/user.model"
import { redis } from "./redis"

interface IToken{
    expires:Date
    maxAge:number
    httpOnly:boolean
    sameSite: 'lax' | 'strict' | "none" | undefined
    secure: boolean
}

export const accessTokenExpires = parseInt(ENV.ACCESS_EXPIRES || '300',10)
export const refreshTokenExpires = parseInt(ENV.REFRESH_EXPIRES || "1200",10)

export const accessTokenOptions:IToken = {
    expires: new Date(Date.now() + accessTokenExpires * 60 * 60 * 1000),
    maxAge: accessTokenExpires * 60 * 60 * 1000,
    httpOnly:true,
    sameSite:'lax',
    secure:false
}

export const refreshTokenOptions:IToken = {
    expires: new Date(Date.now() + refreshTokenExpires * 60 * 60 * 1000),
    maxAge: refreshTokenExpires * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: false
}


export const sendToken = async(user:IUser,statusCode:number,res:Response) =>{
    const accessToken = user.SignAccessToken()
    const refreshToken = user.SignRefreshToken()

    redis.set(user._id.toString(),JSON.stringify(user) as any);

    if(ENV.NODE_ENV === "production" ){
        accessTokenOptions.secure = true
    }

    res.cookie('access_token',accessToken,accessTokenOptions);
    res.cookie('refresh_tokne',refreshToken,refreshTokenOptions);

    res.status(statusCode).json({
        success:true,
        user,
        accessToken
    })
}