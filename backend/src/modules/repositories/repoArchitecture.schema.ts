import {Schema, model} from "mongoose";

const repoArchitectureSchema = new Schema(
    {
        repoId:{type:String,required:true,unique:true},
        architectureType:{type:String,required:true},
        explanation:{type:String,required:true},
        evidence:[String],
        confidence:{type:Number}
    },
    {timestamps:true}
)

export const RepoArchitectureModel = model(
    "RepoArchitecture",
    repoArchitectureSchema
)