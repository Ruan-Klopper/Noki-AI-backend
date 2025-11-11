import { PrismaService } from "../database/prisma.service";
import { CreateAuthProviderDto } from "./dtos/create-auth-provider.dto";
import { UpdateAuthProviderDto } from "./dtos/update-auth-provider.dto";
export declare class AuthProviderService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAuthProviderDto: CreateAuthProviderDto): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        type: import(".prisma/client").$Enums.AuthProviderType;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        base_url: string | null;
        access_token_hash: string;
        refresh_token_hash: string | null;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
    } & {
        id: string;
        created_at: Date;
        user_id: string;
        type: import(".prisma/client").$Enums.AuthProviderType;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        base_url: string | null;
        access_token_hash: string;
        refresh_token_hash: string | null;
    })[]>;
    findOne(id: string): Promise<({
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
    } & {
        id: string;
        created_at: Date;
        user_id: string;
        type: import(".prisma/client").$Enums.AuthProviderType;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        base_url: string | null;
        access_token_hash: string;
        refresh_token_hash: string | null;
    }) | null>;
    findByUser(userId: string): Promise<({
        user: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
        };
    } & {
        id: string;
        created_at: Date;
        user_id: string;
        type: import(".prisma/client").$Enums.AuthProviderType;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        base_url: string | null;
        access_token_hash: string;
        refresh_token_hash: string | null;
    })[]>;
    update(id: string, updateAuthProviderDto: UpdateAuthProviderDto): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        type: import(".prisma/client").$Enums.AuthProviderType;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        base_url: string | null;
        access_token_hash: string;
        refresh_token_hash: string | null;
    }>;
    getAccessToken(userId: string, providerType: string): Promise<string | null>;
    remove(id: string): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        type: import(".prisma/client").$Enums.AuthProviderType;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        base_url: string | null;
        access_token_hash: string;
        refresh_token_hash: string | null;
    }>;
}
