declare class ProjectIdDto {
    project_id: string;
}
declare class TaskIdDto {
    task_id: string;
}
declare class TodoIdDto {
    todo_id: string;
}
export declare class ChatAiDto {
    conversation_id: string;
    prompt: string;
    projects?: ProjectIdDto[];
    tasks?: TaskIdDto[];
    todos?: TodoIdDto[];
}
export {};
