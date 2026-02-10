import dotenv from 'dotenv';

dotenv.config({quiet:true});


export default {
    PORT: process.env.PORT,
    MONGOURI: process.env.DB_URL,
    CLERK_PUBLISH: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET: process.env.CLERK_SECRET_KEY,
}
