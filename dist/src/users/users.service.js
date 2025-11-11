"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const { password, ...userData } = createUserDto;
        const password_hash = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: {
                ...userData,
                password_hash,
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                profile_image: true,
                google_id: true,
                created_at: true,
                updated_at: true,
            },
        });
    }
    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                profile_image: true,
                google_id: true,
                created_at: true,
                updated_at: true,
            },
        });
    }
    async findOne(id) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                profile_image: true,
                google_id: true,
                created_at: true,
                updated_at: true,
            },
        });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async update(id, updateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                profile_image: true,
                google_id: true,
                created_at: true,
                updated_at: true,
            },
        });
    }
    async remove(id) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
    async validatePassword(user, password) {
        return bcrypt.compare(password, user.password_hash);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map