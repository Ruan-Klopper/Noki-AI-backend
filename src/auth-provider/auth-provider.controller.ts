import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthProviderService } from './auth-provider.service';
import { CreateAuthProviderDto } from './dtos/create-auth-provider.dto';
import { UpdateAuthProviderDto } from './dtos/update-auth-provider.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('auth-providers')
@UseGuards(JwtAuthGuard)
export class AuthProviderController {
  constructor(private readonly authProviderService: AuthProviderService) {}

  @Post()
  async create(@Body() createAuthProviderDto: CreateAuthProviderDto) {
    return this.authProviderService.create(createAuthProviderDto);
  }

  @Get()
  async findAll() {
    return this.authProviderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.authProviderService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAuthProviderDto: UpdateAuthProviderDto) {
    return this.authProviderService.update(id, updateAuthProviderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.authProviderService.remove(id);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return this.authProviderService.findByUser(userId);
  }
}
