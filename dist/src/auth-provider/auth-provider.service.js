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
exports.AuthProviderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const bcrypt = require("bcryptjs");
let AuthProviderService = class AuthProviderService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAuthProviderDto) {
        const { access_token, refresh_token, ...providerData } = createAuthProviderDto;
        const access_token_hash = providerData.type === "Canvas"
            ? access_token
            : await bcrypt.hash(access_token, 10);
        const refresh_token_hash = refresh_token
            ? providerData.type === "Canvas"
                ? refresh_token
                : await bcrypt.hash(refresh_token, 10)
            : null;
        return this.prisma.authProvider.create({
            data: {
                ...providerData,
                access_token_hash,
                refresh_token_hash,
            },
        });
    }
    async findAll() {
        return this.prisma.authProvider.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        return this.prisma.authProvider.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                    },
                },
            },
        });
    }
    async findByUser(userId) {
        return this.prisma.authProvider.findMany({
            where: { user_id: userId },
            include: {
                user: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                    },
                },
            },
        });
    }
    async update(id, updateAuthProviderDto) {
        const { access_token, refresh_token, ...updateData } = updateAuthProviderDto;
        const data = { ...updateData };
        if (access_token) {
            data.access_token_hash =
                updateData.type === "Canvas"
                    ? access_token
                    : await bcrypt.hash(access_token, 10);
        }
        if (refresh_token) {
            data.refresh_token_hash =
                updateData.type === "Canvas"
                    ? refresh_token
                    : await bcrypt.hash(refresh_token, 10);
        }
        return this.prisma.authProvider.update({
            where: { id },
            data,
        });
    }
    async getAccessToken(userId, providerType) {
        const provider = await this.prisma.authProvider.findFirst({
            where: {
                user_id: userId,
                type: providerType,
            },
        });
        if (!provider) {
            return null;
        }
        return provider.access_token_hash;
    }
    async remove(id) {
        return this.prisma.authProvider.delete({
            where: { id },
        });
    }
};
exports.AuthProviderService = AuthProviderService;
exports.AuthProviderService = AuthProviderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthProviderService);
//# sourceMappingURL=auth-provider.service.js.map