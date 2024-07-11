/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUserId } from 'src/common/decorators/getCurrentUserId.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/response-user.dto';

// need to restrict this to admin only, or the user itself can get, update, remove its data

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // restrict to admin only
  @Get()
  async findAll(): Promise<{ users: ResponseUserDto[] }> {
    const users = await this.usersService.findAll();

    const usersResponse = plainToInstance(ResponseUserDto, users);

    return { users: usersResponse };
  }

  @Get('me')
  async getProfile(
    @GetCurrentUserId() id: string,
  ): Promise<{ user: ResponseUserDto }> {
    const user = await this.usersService.findById(id);
    const userResponse = plainToInstance(ResponseUserDto, user.toObject());
    return { user: userResponse };
  }

  @Patch('me')
  async UpdateProfile(
    @GetCurrentUserId() id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ user: ResponseUserDto }> {
    const user = await this.usersService.findOneAndUpdate(id, updateUserDto);
    const userResponse = plainToInstance(ResponseUserDto, user.toObject());
    return { user: userResponse };
  }

  @Delete('me')
  async removeProfile(
    @GetCurrentUserId() id: string,
  ): Promise<{ message: string }> {
    await this.usersService.remove(id);
    return { message: 'User removed successfully' };
  }
}
