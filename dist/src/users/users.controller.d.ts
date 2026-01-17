import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        google_id: string | null;
        firstname: string;
        lastname: string;
        profile_image: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        google_id: string | null;
        firstname: string;
        lastname: string;
        profile_image: string | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    getProfile(req: any): Promise<{
        id: string;
        email: string;
        google_id: string | null;
        firstname: string;
        lastname: string;
        profile_image: string | null;
        created_at: Date;
        updated_at: Date;
    } | null>;
    getAIUsage(req: any): Promise<{
        totals: {
            prompt_tokens: number;
            completion_tokens: number;
            total_tokens: number;
            embedding_tokens: number;
            total_cost_usd: number;
        };
        monthly: {
            prompt_tokens: number;
            completion_tokens: number;
            total_tokens: number;
            embedding_tokens: number;
            cost_usd: number;
            change_percentage: number;
        };
        limits: {
            token_limit: number;
            tokens_remaining: number;
            tokens_used: number;
            usage_percentage: number;
            is_premium: boolean;
        };
        message_count: number;
    }>;
    updateProfile(req: any, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        google_id: string | null;
        firstname: string;
        lastname: string;
        profile_image: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    changePassword(req: any, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    deleteAccount(req: any): Promise<{
        id: string;
        email: string;
        google_id: string | null;
        firstname: string;
        lastname: string;
        password_hash: string;
        profile_image: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        google_id: string | null;
        firstname: string;
        lastname: string;
        profile_image: string | null;
        created_at: Date;
        updated_at: Date;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        google_id: string | null;
        firstname: string;
        lastname: string;
        profile_image: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string;
        google_id: string | null;
        firstname: string;
        lastname: string;
        password_hash: string;
        profile_image: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
}
