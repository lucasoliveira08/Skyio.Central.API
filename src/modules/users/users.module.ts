import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SendGridModule } from '../../utils/jobs/sendgrid/sendgrid.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersRepository } from './users.repository';
import { RolesService } from '../roles/roles.service';
import { RolesRepository } from '../roles/roles.repository';

@Module({
  imports: [SendGridModule, PrismaModule],
  providers: [UsersService, UsersRepository, RolesService, RolesRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
