import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../model/user.model";
import jwt , {Secret,JwtPayload} from 'jsonwebtoken';
import { ENV } from "../config/ENV";
import ejs from 'ejs'
import path from 'path'
import sendMail from "../utils/sendMail";
import Errorhandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/CatchAsync";
import { sendToken } from "../utils/jwt";

export const Register = CatchAsyncError(async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !email || !password) {
      res.status(404).json({ warning: "Please fill all the fields" });
    }

    const NewUser = await User.create({
      name:username,
      email,
      password,
    });

    const activationToken = createAcivationToken(NewUser);

    const activationCode = activationToken.activationCode;
    const data = {user:{name:NewUser.name},activationCode}

    const html = await ejs.renderFile(path.join(__dirname,"../mails/activation-mail.html"),data)

    try{
      await sendMail({
        email:NewUser.email,
        subject:"Activation Email",
        template:"activation-mail.ejs",
        data
      })

      res.status(200).json({
        success:true,
        message: `Please check your email:${NewUser.email} to activate your account`,
        token:activationToken.token
      })

    }catch(err:any){
      return next(new Errorhandler(err.message,400))
    }  

    res.status(200).json({ activationToken, user: NewUser });
  } catch (err: any) {
    return next(new Errorhandler(err.message,400))
  }
});


interface IActivationToken{
  token:string
  activationCode:string
}

export const createAcivationToken = (user:any):IActivationToken =>{
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign({
    user,activationCode
  },ENV.ACTIVATION_SECRET as Secret,{
    expiresIn:'5m'
  })

  return {token,activationCode}
}


// activation user 
interface IActivationRequest{
  activation_token:string
  activation_code:string
}

export const activateUser = CatchAsyncError(async(req:Request,res:Response,next:NextFunction) =>{
  try{

    const {activation_token,activation_code} = req.body as IActivationRequest
    
    const newUser:{user:IUser; activationCode:string} = jwt.verify(
      activation_token,
      ENV.ACTIVATION_SECRET as string
    ) as {user:IUser; activationCode:string }

    if(newUser.activationCode !== activation_code){
      return next(new Errorhandler("Invalid activation code",400))
    }

    const {name,email,password} = newUser.user

    const existUser = await User.findOne({email})

    if(existUser) return next(new Errorhandler("Email already exist",400))

    const user = await User.create({
      name,email,password
    })

    res.status(200).json({
      success:true
    })


  }catch(err:any){
    return next(new Errorhandler(err.message,400))
  }
})


interface ILoginRequest{
  email:string
  password:string
}

export const LoginUser = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try{

    const {email,password} = req.body as ILoginRequest

    if(!email || !password){
      return next(new Errorhandler("Please fill all fields",400))
    }

    const user = await User.findOne({email}).select("+password")

    if(!user) return next(new Errorhandler("Invalid email or password",400))

    const isPassword = await user.comparePassword(password)

    if(!isPassword) return next(new Errorhandler("Invalid email and password ",400))

    sendToken(user,200,res)

  }catch(err:any){
    return next(new Errorhandler("Internal Server Error",400))
  }
})