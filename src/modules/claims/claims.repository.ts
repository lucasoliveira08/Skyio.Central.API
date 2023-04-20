import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClaimDTO } from './dto/Claims.dto';
import { Claim } from '@prisma/client';

@Injectable()
export class ClaimsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAllClaims(): Promise<Claim[]> {
    return this.prismaService.claim.findMany();
  }

  findByUniqueClaimById(id: string): Promise<Claim> {
    return (
      this.prismaService.claim.findUnique({
        where: {
          id: id,
        },
      }) ?? null
    );
  }
}
