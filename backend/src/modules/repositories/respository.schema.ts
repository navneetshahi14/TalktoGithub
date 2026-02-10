import {Schema, model} from "mongoose"

const respositorySchema =new Schema(
    {
        owner:{type:String, required:true},
        name:{type:String, required:true},
        url: {type:String, required:true},

        stars: Number,
        forks:Number,
        languages: String,
        analyzedAt: Date,
    },{
        timestamps:true
    }
)

export const RepositoryModel = model("Repository",respositorySchema);
