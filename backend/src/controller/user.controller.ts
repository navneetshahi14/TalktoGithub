import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsync";
import Errorhandler from "../utils/ErrorHandler";
import User from "../model/user.model";
import jwt, { Secret } from "jsonwebtoken";
import { ENV } from "../config/ENV";
import ejs from 'ejs'
import path from 'path'
import sendMail from "../utils/sendMail";

interface IRegister {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const isEmailExist = await User.findOne({ email });

      if (isEmailExist) {
        return next(
          new Errorhandler("User with this email already exist", 400)
        );
      }

      const user: IRegister = {
        name,
        email,
        password,
      };

      const activationToken = createActivation(user);

      const activationCode = activationToken.activationCode;
      const data = {user:{name:user.name},activationCode};
      const html = await ejs.renderFile(path.join(__dirname,"../mails/activation-mails.ejs"),data);

      try{

        await sendMail({
            email:user.email,
            subject:`Activation mail has been sent to ${user.email}`,
            template:"activation-mails.ejs",
            data
        })

      }catch(err:any){
        console.log(err.message)
        return next(new Errorhandler(err.message,400))
      }

    } catch (err: any) {
      console.log(err.message);
      return next(new Errorhandler(err.message, 400));
    }
  }
);

interface IActivateToken {
  token: string;
  activationCode: string;
}

export const createActivation = (user: any):IActivateToken => {
  const activationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const token = jwt.sign({
    user,activationCode
  },ENV.JWT_SECRET as Secret,{
    expiresIn:'5m'
  });

  return {activationCode,token}

};


// activate user
interface IActivateRequest{
    activation_token:string
    activation_code:string
}


export const activateUser = CatchAsyncError(async(req:Request,res:Response,next:NextFunction) =>{
    try{

        const {activation_code,activation_token} = req.body;

        

    }catch(err:any){
        console.log(err.message)
        return next(new Errorhandler(err.message,400));
    }
})
