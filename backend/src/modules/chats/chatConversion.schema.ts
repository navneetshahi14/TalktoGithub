import {Schema,model} from 'mongoose'

const chatConversationSchema = new Schema(
    {
        repoId: {type: String, required:true, index:true},
        userId: {type: String, required:true, index:true},

        title: {type: String, default: "New Chat"}
    },
    {
        timestamps:true
    }
)

export const ChatConversationalModel = model(
    "ChatConversion",
    chatConversationSchema
);