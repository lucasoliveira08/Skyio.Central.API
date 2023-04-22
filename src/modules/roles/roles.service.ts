import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateRoleDTO, FindOneRoleDTO, UpdateRoleDTO } from './dto/Roles.dto';
import { RolesRepository } from './roles.repository';
import { PagedResult } from 'src/utils/dto/pagination/types.dto';
import { PaginationDTO } from 'src/utils/dto/pagination/pagination.dto';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async findAllRoles(pagination: PaginationDTO): Promise<PagedResult<Role>> {
    return await this.rolesRepository.findAllRoles(pagination);
  }

  async findOneRole(filter: FindOneRoleDTO): Promise<Role | null> {
    if (!filter.id && !filter.name) return null;

    const role = await this.rolesRepository.findOneRole(filter);

    if (!role) {
      throw new BadRequestException('Cargo não encontrado');
    }

    return role;
  }

  async createRole(input: CreateRoleDTO): Promise<Role> {
    const foundRole = await this.rolesRepository.findOneRole({
      name: input.name,
    });

    if (foundRole) throw new ConflictException('Este cargo já está cadastrado');

    try {
      return this.rolesRepository.createRole(input);
    } catch {
      throw new InternalServerErrorException('Erro ao criar cargo');
    }
  }

  async updateRole(id: string, input: UpdateRoleDTO): Promise<Role> {
    const role = await this.rolesRepository.findOneRole({ id: id });

    if (!role) {
      throw new BadRequestException('Cargo não encontrado');
    }

    try {
      return this.rolesRepository.updateRole(id, input);
    } catch {
      throw new InternalServerErrorException('Erro ao atualizar o cargo');
    }
  }

  async deleteRole(id: string): Promise<Role> {
    const role = await this.rolesRepository.findOneRole({ id: id });

    if (!role) {
      throw new BadRequestException('Cargo não encontrado');
    }

    try {
      return this.rolesRepository.deleteRole(id);
    } catch {
      throw new InternalServerErrorException('Erro ao deletar o cargo');
    }
  }
}
