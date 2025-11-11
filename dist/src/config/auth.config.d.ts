declare const _default: (() => {
    jwt: {
        secret: string | undefined;
        expiresIn: string;
    };
    google: {
        clientId: string | undefined;
        clientSecret: string | undefined;
        callbackUrl: string | undefined;
    };
    session: {
        secret: string | undefined;
        maxAge: number;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    jwt: {
        secret: string | undefined;
        expiresIn: string;
    };
    google: {
        clientId: string | undefined;
        clientSecret: string | undefined;
        callbackUrl: string | undefined;
    };
    session: {
        secret: string | undefined;
        maxAge: number;
    };
}>;
export default _default;
