import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Claims } from 'src/utils/decorators/claims.decorator';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { CreateRoleDTO, FindOneRoleDTO, UpdateRoleDTO } from './dto/Roles.dto';
import { RolesService } from './roles.service';
import { PagedResult } from 'src/utils/dto/pagination/types.dto';
import { PaginationDTO } from 'src/utils/dto/pagination/pagination.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Roles('Admin')
  @Claims('read-role')
  @Get()
  async findAllRoles(
    @Query() pagination: PaginationDTO,
  ): Promise<PagedResult<Role>> {
    return this.rolesService.findAllRoles(pagination);
  }

  @Roles('Admin')
  @Claims('read-role')
  @Get(':filter')
  async findOneRole(@Param('filter') filter: FindOneRoleDTO): Promise<Role> {
    return this.rolesService.findOneRole(filter);
  }

  @Roles('Admin')
  @Claims('create-role')
  @Post()
  async createRole(@Body() input: CreateRoleDTO): Promise<Role> {
    return this.rolesService.createRole(input);
  }

  @Roles('Admin')
  @Claims('update-role')
  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() input: UpdateRoleDTO,
  ): Promise<Role> {
    return this.rolesService.updateRole(id, input);
  }

  @Roles('Admin')
  @Claims('delete-role')
  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<Role> {
    return this.rolesService.deleteRole(id);
  }
}
