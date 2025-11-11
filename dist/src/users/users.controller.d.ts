import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
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
