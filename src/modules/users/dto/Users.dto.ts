import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class FindOneUserDTO implements Readonly<FindOneUserDTO> {
  @ApiProperty({ required: false })
  @IsEmail()
  @Optional()
  @MaxLength(170)
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Optional()
  @MaxLength(170)
  id?: string;
}

export class CreateUserDTO implements Readonly<CreateUserDTO> {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'O campo e-mail é obrigatório' })
  @IsEmail({}, { message: 'Informe um endereço de e-mail válido' })
  @MaxLength(170)
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  @MaxLength(80, { message: 'A senha deve ter no máximo 80 caracteres' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'O campo cargo é obrigatório' })
  @MaxLength(170, { message: 'O cargo deve ter no máximo 170 caracteres' })
  roleId: string;
}

export class UpdateUserDTO implements Readonly<UpdateUserDTO> {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'O campo e-mail é obrigatório' })
  @IsEmail({}, { message: 'Informe um endereço de e-mail válido' })
  @MaxLength(170)
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  @MaxLength(80, { message: 'A senha deve ter no máximo 80 caracteres' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'O campo cargo é obrigatório' })
  @MaxLength(170, { message: 'O cargo deve ter no máximo 170 caracteres' })
  roleId: string;
}

export class LoginUserDTO implements Readonly<LoginUserDTO> {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'O campo e-mail é obrigatório' })
  @IsEmail({}, { message: 'Informe um endereço de e-mail válido' })
  @MaxLength(170, { message: 'O e-mail deve ter no máximo 170 caracteres' })
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  @MaxLength(80, { message: 'A senha deve ter no máximo 80 caracteres' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  password: string;
}
