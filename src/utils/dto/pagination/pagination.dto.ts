/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { SafeIntTransform } from '../../transforms/safe-int.transform';

export class PaginationDTO implements Readonly<PaginationDTO> {
  @ApiProperty({ required: false, type: Number })
  @IsInt()
  @Min(1)
  @Transform((value) => SafeIntTransform(value))
  skip: number = 1;

  @ApiProperty({ required: false, type: Number })
  @IsInt()
  @Min(5)
  @Max(100)
  @Transform((value) => SafeIntTransform(value))
  take: number = 10;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @MinLength(1)
  @MaxLength(25)
  sortField: string = 'createdAt';

  @ApiProperty({ required: false, type: String })
  @IsString()
  @MinLength(1)
  @MaxLength(4)
  sortBy: string = 'asc';
}
