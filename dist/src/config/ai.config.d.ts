declare const _default: (() => {
    server: {
        url: string;
        token: string | undefined;
    };
    openai: {
        apiKey: string | undefined;
        model: string;
        maxTokens: number;
    };
    langchain: {
        temperature: number;
        maxRetries: number;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    server: {
        url: string;
        token: string | undefined;
    };
    openai: {
        apiKey: string | undefined;
        model: string;
        maxTokens: number;
    };
    langchain: {
        temperature: number;
        maxRetries: number;
    };
}>;
export default _default;
