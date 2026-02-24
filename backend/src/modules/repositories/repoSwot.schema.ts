import {Schema,model} from 'mongoose'

const repoSwotSchema = new Schema(
    {
        repoId: {type: String, required:true, unique:true},
        strengths:[String],
        weaknesses:[String],
        opportunities:[String],
        threats:[String]
    },
    {
        timestamps:true
    }
)

export const RepoSwotModel = model("RepoSwot",repoSwotSchema);