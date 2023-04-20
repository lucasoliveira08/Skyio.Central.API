import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Claim, Prisma } from '@prisma/client';
import { CreateClaimDTO } from './dto/Claims.dto';
import { ClaimsRepository } from './claims.repository';

@Injectable()
export class ClaimsService {
  constructor(private readonly claimsRepository: ClaimsRepository) {}

  async findAllClaims(): Promise<Claim[]> {
    const allClaims = await this.claimsRepository.findAllClaims();

    return allClaims;
  }

  async findByUniqueClaimById(id: string): Promise<Claim> {
    const claim = await this.claimsRepository.findByUniqueClaimById(id);

    if (!claim) {
      throw new NotFoundException('Permissão não encontrada');
    }

    return claim;
  }
}
