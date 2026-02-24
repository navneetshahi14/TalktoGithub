import { ChatConversationalModel } from "./chatConversion.schema";

export class ChatService{
    async getOrCreateConversation(repoId:string,userId:string){
        const latest = await ChatConversationalModel.findOne({repoId, userId}).sort({createdAt:-1})

        if(latest) return latest;

        return ChatConversationalModel.create({repoId,userId});
    }

    async createConversation(repoId:string,userId:string){
        return ChatConversationalModel.create({repoId,userId})
    }

    async getUserConverstions(repoId:string,userId:string){
        return ChatConversationalModel.find({repoId, userId}).sort({createdAt:-1})
    }
}