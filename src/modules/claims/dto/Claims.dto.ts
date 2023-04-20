import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class AddClaimToRoleDTO {
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(170)
  id?: string;
}
export class CreateClaimDTO implements Readonly<CreateClaimDTO> {
  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(170)
  name: string;
}
