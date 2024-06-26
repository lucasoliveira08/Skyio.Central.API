import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDTO, FindOneRoleDTO, UpdateRoleDTO } from './dto/Roles.dto';

@Injectable()
export class RolesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllRoles(): Promise<Role[]> {
    return this.prismaService.role.findMany();
  }

  async findOneRole(filter: FindOneRoleDTO) {
    const role = this.prismaService.role.findFirst({
      where: filter,
      include: {
        claims: true,
      },
    });

    return role ?? null;
  }

  async createRole(input: CreateRoleDTO): Promise<Role> {
    const role = this.prismaService.role.create({
      data: {
        name: input.name,
        claims: {
          connect: input.claims.map((claim) => ({
            id: claim.id,
          })),
        },
      },
      include: {
        claims: true,
      },
    });

    return role;
  }

  async updateRole(id: string, input: UpdateRoleDTO): Promise<Role> {
    const role = this.prismaService.role.update({
      data: {
        name: input.name,
        claims: {
          set: [],
          connect: input.claims.map((claim) => ({
            id: claim.id,
          })),
        },
      },
      where: {
        id: id,
      },
      include: {
        claims: true,
      },
    });

    return role;
  }

  async deleteRole(id: string): Promise<Role> {
    return this.prismaService.role.delete({
      where: {
        id: id,
      },
    });
  }
}
