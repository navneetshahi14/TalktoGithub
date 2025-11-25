import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsync";
import Errorhandler from "../utils/ErrorHandler";
import User, { IUser } from "../model/user.model";
import jwt, { Secret } from "jsonwebtoken";
import { ENV } from "../config/ENV";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import userModel from "../model/user.model";
import { comparePass } from "../utils/passhash";

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
      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mails.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: `Activation mail has been sent to ${user.email}`,
          template: "activation-mails.ejs",
          data,
        });
      } catch (err: any) {
        console.log(err.message);
        return next(new Errorhandler(err.message, 400));
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

export const createActivation = (user: any): IActivateToken => {
  const activationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    ENV.JWT_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );

  return { activationCode, token };
};

// activate user
interface IActivateRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_code, activation_token } = req.body;

      const newUser:{user:IUser; activationCode:string} = jwt.verify(
        activation_token,ENV.JWT_SECRET as string
      ) as {user:IUser; activationCode:string}


      if(newUser.activationCode !== activation_code){
        return next(new Errorhandler("Invalid authorization token",500))
      }

      const {name,email,password} = newUser.user;

      const existUser = await userModel.findOne({email});

      if(existUser){
        return next(new Errorhandler("Email already exist",400))
      }

      const user = await userModel.create({
        name,email,password
      })

      res.status(200).json({
        success:true
      })

    } catch (err: any) {
      console.log(err.message);
      return next(new Errorhandler(err.message, 400));
    }
  }
);


interface ILoginRequest{
  email:string
  password:string
}

export const LoginUser = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try{

    const {email,password} = req.body

    if(!email || !password){
      return next(new Errorhandler("Please fill all the fields",404));
    }

    const user = await userModel.findOne({email}).select("+password");

    if(!user)
    {
      return next(new Errorhandler("User don't exist please register",400))
    }

    const passwordmatch = await comparePass(password,user.password);

    if(!passwordmatch) return next(new Errorhandler("Invalid Credentials",400))




  }catch(err:any){
    return next(new Errorhandler(err.message,500))
  }
})