import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Claim } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsString, MaxLength, ValidateNested } from 'class-validator';
import { AddClaimToRoleDTO } from 'src/modules/claims/dto/Claims.dto';

export class FindOneRoleDTO implements Readonly<FindOneRoleDTO> {
  @ApiProperty({ required: false })
  @IsString()
  @Optional()
  @MaxLength(170)
  id?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Optional()
  @MaxLength(170)
  name?: string;
}
export class CreateRoleDTO implements Readonly<CreateRoleDTO> {
  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(170)
  name: string;

  @ApiProperty({ required: false, type: [AddClaimToRoleDTO] })
  @ValidateNested({ each: true })
  @Type(() => AddClaimToRoleDTO)
  claims?: AddClaimToRoleDTO[];
}

export class UpdateRoleDTO implements Readonly<UpdateRoleDTO> {
  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(170)
  name: string;
  @ApiProperty({ required: false, type: [AddClaimToRoleDTO] })
  @ValidateNested({ each: true })
  @Type(() => AddClaimToRoleDTO)
  claims?: AddClaimToRoleDTO[];
}
