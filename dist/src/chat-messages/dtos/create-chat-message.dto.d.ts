import { MessageType } from "../../common/enums/prisma-enums";
export declare class CreateChatMessageDto {
    conversation_id: string;
    type: MessageType;
    prompt?: string;
    projects?: any;
    tasks?: any;
    todos?: any;
    text?: string;
    blocks?: any;
    token_usage?: any;
    metadata?: any;
    embedding_id?: string;
}
