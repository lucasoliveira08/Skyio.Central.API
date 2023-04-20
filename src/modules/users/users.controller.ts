import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Claims } from 'src/utils/decorators/claims.decorator';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { CreateUserDTO, FindOneUserDTO, UpdateUserDTO } from './dto/Users.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles('Admin')
  @Claims('read-user')
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Roles('Admin')
  @Claims('read-user')
  @Get(':filter')
  async findOneUser(@Param('filter') filter: FindOneUserDTO): Promise<User> {
    return this.usersService.findOneUser(filter);
  }

  @Roles('Admin')
  @Claims('create-user')
  @Post()
  async createUser(@Body() input: CreateUserDTO): Promise<User> {
    return this.usersService.createUser(input);
  }

  @Roles('Admin')
  @Claims('update-user')
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() input: UpdateUserDTO,
  ): Promise<User> {
    return this.usersService.updateUser(id, input);
  }

  @Roles('Admin')
  @Claims('delete-user')
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
