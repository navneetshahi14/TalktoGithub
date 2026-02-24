import {Schema, model} from "mongoose"

const chatMessageSchema = new Schema(
    {
        conversationId:{
            type:Schema.Types.ObjectId,
            ref:"ChatConversion",
            required:true,
            index:true,
        },
        role:{
            type: String,
            enum: ["user","assistant"],
            required:true,
        },
        content:{type:String,required:true},
        soruces:[String],
    },
    {
        timestamps:true
    }
)

export const ChatMessageModel = model("ChatMessage",chatMessageSchema);