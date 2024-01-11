import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Auth()
  // // @UseGuards(JwtAuthGuard)
  // // @Roles(Role.ADMIN)
  // // @UseGuards(RolesGuard)
  // @Get()
  // async testReq(@User('id') id: number) {
  //   return await this.usersService.test(id);
  // }

  // Admin methods

  @Delete(':id')
  @Auth('admin')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Get('count')
  @Auth('admin')
  async getUserCount() {
    return this.usersService.getCount();
  }

  @Get('profile')
  @Auth()
  async getProfile(@User('id') id: number) {
    return this.usersService.findById(id);
  }

  @Get()
  @Auth('admin')
  async getAllUsers(searchTerm?: string) {
    return this.usersService.getAllUsers();
  }

  @Put('profile')
  @Auth()
  async updateProfile(@User('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.updateProfile(id, dto);
  }

  @Put(':id')
  @Auth('admin')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(id, dto);
  }

  @Get(':id')
  @Auth('admin')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Get('profile/favorites')
  @Auth()
  async getFavorites(@User('id') id: number) {
    return this.usersService.getFavorites(id);
  }

  @Put('profile/favorites')
  @Auth()
  async toggleFavorites(
    @User('id') id: number,
    @Body('movieId')
    movieId: number,
  ) {
    return this.usersService.toggleFavorites(id, movieId);
  }
}
