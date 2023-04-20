import { Controller, Get, Param } from '@nestjs/common';
import { Claim, Prisma } from '@prisma/client';
import { ClaimsService } from './claims.service';
import { Claims } from 'src/utils/decorators/claims.decorator';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Claims')
@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Roles('Admin')
  @Claims('read-claim')
  @Get()
  async findAllRoles(): Promise<Claim[]> {
    return this.claimsService.findAllClaims();
  }

  @Roles('Admin')
  @Claims('read-claim')
  @Get(':id')
  async findByUniqueClaim(@Param('id') id: string): Promise<Claim> {
    return this.claimsService.findByUniqueClaimById(id);
  }
}
