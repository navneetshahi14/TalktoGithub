import nodemailer, { Transporter } from 'nodemailer'
import ejs, { renderFile } from 'ejs'
import path from 'path'
import { ENV } from '../config/ENV'

interface IEmailOptions {
    email:string
    subject:string
    template:string
    data:{[key:string]:any}
}


const sendMail = async(options:IEmailOptions):Promise<void> =>{
    const transporter:Transporter = nodemailer.createTransport({
        service:ENV.SERVICE,
        auth:{
            user:ENV.MAIL,
            pass:ENV.PASS
        }
    })

    const {email,subject,template,data} = options

    const templatePath = path.join(__dirname,"../mails",template)

    const html:string = await ejs.renderFile(templatePath,data);

    const mailOptions = {
        from : ENV.MAIL,
        to : email,
        subject,
        html
    }

    await transporter.sendMail(mailOptions)
}


export default sendMail