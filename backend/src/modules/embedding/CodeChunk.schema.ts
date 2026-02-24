import { Schema, model } from "mongoose";

const CodeChunkSchema = new Schema(
    {
        repoId:{type:String,required:true},
        filePath: {type:String,required:true},

        content:{type:String,required:true},
        chunkIndex:{type:Number,required:true},

        embedding: {
            type:[Number],
            required:true
        }
    },
    {
        timestamps:true
    }
)

export const CodeChunkModel = model("CodeChunk",CodeChunkSchema);