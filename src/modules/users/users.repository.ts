import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDTO, FindOneUserDTO, UpdateUserDTO } from './dto/Users.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async findOneUser(filter: FindOneUserDTO) {
    const user = this.prismaService.user.findFirst({
      where: filter,
      include: {
        roles: {
          include: {
            claims: true,
          },
        },
      },
    });

    return user ?? null;
  }

  async createUser(input: CreateUserDTO): Promise<User> {
    const cryptedPass = await bcrypt.hash(input.password, 14);

    const user = await this.prismaService.user.create({
      data: {
        email: input.email,
        password: cryptedPass,
        recoverToken: null,
        roles: {
          connect: {
            id: input.roleId,
          },
        },
      },
      include: {
        roles: {
          include: {
            claims: true,
          },
        },
      },
    });

    return user;
  }

  async updateUser(id: string, input: UpdateUserDTO): Promise<User> {
    const cryptedPass = input.password
      ? await bcrypt.hash(input.password, 14)
      : undefined;

    const user = this.prismaService.user.update({
      data: {
        email: input.email,
        password: cryptedPass,
        recoverToken: input.recoverToken,
      },
      where: {
        id: id,
      },
    });

    return user;
  }

  async updateUserWithRoles(id: string, input: UpdateUserDTO): Promise<User> {
    const cryptedPass = await bcrypt.hash(input.password, 14);

    const user = this.prismaService.user.update({
      data: {
        email: input.email,
        password: cryptedPass,
        recoverToken: input.recoverToken,
        roles: {
          connect: {
            id: input.roleId,
          },
        },
      },
      where: {
        id: id,
      },
      include: {
        roles: {
          include: {
            claims: true,
          },
        },
      },
    });

    return user;
  }

  async deleteUser(id: string): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
