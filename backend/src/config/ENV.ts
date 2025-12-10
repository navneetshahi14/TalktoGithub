import dotenv from 'dotenv';
dotenv.config({quiet:true});


export const ENV = {
    PORT:process.env.PORT,
    DB_URL:process.env.DB_URL,
    REDIS_URL: process.env.REDIS_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    HOST: process.env.HOST,
    PORTNO: process.env.PORTNO,
    SERVICE: process.env.SERVICE,
    MAIL: process.env.SMTP_MAIL,
    PASS: process.env.SMTP_PASS,
    ACCESS_EXPIRES: process.env.ACCESS_EXPIRES,
    REFRESH_EXPIRES: process.env.REFRESH_EXPIRES,
    NODE_ENV: process.env.NODE_ENV,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    HF_KEY: process.env.HF_KEY,
    ACTIVATION_SECRET:process.env.ACTIVATION_SECRET
}