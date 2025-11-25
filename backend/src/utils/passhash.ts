import bcrypt from "bcryptjs";

export const hashPass = async(password:string) =>{
    const hashed = await bcrypt.hash(password,10);
    return hashed;
}

export const comparePass = async(savedPass:string,currPass:string) => {
    const comp = await bcrypt.compare(savedPass,currPass);
    return comp;
}

