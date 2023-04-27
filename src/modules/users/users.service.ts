import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO, FindOneUserDTO, UpdateUserDTO } from './dto/Users.dto';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesService: RolesService,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return await this.usersRepository.findAllUsers();
  }

  async findOneUser(filter: FindOneUserDTO): Promise<User | null> {
    if (!filter.email && !filter.id && !filter.recoverToken) return null;

    const user = await this.usersRepository.findOneUser(filter);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async createUser(input: CreateUserDTO) {
    const foundUser = await this.usersRepository.findOneUser({
      email: input.email,
    });

    if (foundUser)
      throw new ConflictException('Este e-mail já está cadastrado');

    await this.rolesService.findOneRole({ id: input.roleId });

    return this.usersRepository.createUser(input);
  }

  async updateUser(id: string, input: UpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findOneUser({ id: id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      return this.usersRepository.updateUser(id, input);
    } catch {
      throw new InternalServerErrorException('Erro ao atualizar o cargo');
    }
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.usersRepository.findOneUser({ id: id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      return this.usersRepository.deleteUser(id);
    } catch {
      throw new InternalServerErrorException('Erro ao deletar o cargo');
    }
  }
}
