import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SendGridProducerService } from '../../utils/jobs/sendgrid/sendgrid-producer.service';
import { UsersService } from '../users/users.service';
import { Role } from '@prisma/client';
import {
  RecoverPasswordDTO,
  RequestRecoverPasswordDTO,
} from '../users/dto/Users.dto';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { encryptSHA256 } from 'src/utils/functions/encrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private sendGridProducer: SendGridProducerService,
  ) {}

  async signIn(user: any, res) {
    const access_token = await this.login(user);

    const cookiesOpts = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 3,
    };

    res.cookie('jwt', access_token, cookiesOpts);

    return {
      response: {
        user: user,
        expire: new Date().setDate(new Date().getDate() + 3),
      },
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const { password, ...user } = await this.userService.findOneUser({
      email: email,
    });
    if (!user) throw new BadRequestException("User doesn't exist");

    const valid = await bcrypt.compare(pass, password);
    if (!valid) throw new BadRequestException('Invalid credentials');

    return user;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles.map((e) => e.name),
      claims: user.roles.reduce(
        (acc, cur) => acc.concat(cur.claims.map((e) => e.name)),
        [],
      ),
    };

    return this.jwtService.sign(payload, { expiresIn: '3d' });
  }

  async verifyJwt(jwt): Promise<{
    expired: boolean;
    roles?: Role;
    email?: string;
    id?: string;
    expiresIn?: number;
  }> {
    try {
      const decoded = await this.jwtService.verify(jwt);
      const { exp, access_until, roles, email, id } = decoded;

      if (access_until && access_until <= Date.now()) {
        return { expired: true };
      }

      if (exp > Date.now() / 1000) {
        return { expired: false, roles, email, expiresIn: exp, id };
      }

      return { expired: true };
    } catch (error) {
      return { expired: true };
    }
  }

  async requestResetPassword(input: RequestRecoverPasswordDTO) {
    const user = await this.userService.findOneUser({
      email: input.email,
    });

    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');

      const passwordResetToken = encryptSHA256(resetToken);

      await this.userService.updateUser(user.id, {
        recoverToken: passwordResetToken,
      });
    }
  }

  async resetPassword(token: string, input: RecoverPasswordDTO) {
    const passwordResetToken = encryptSHA256(token);

    const user = await this.userService.findOneUser({
      recoverToken: passwordResetToken,
    });

    await this.userService.updateUser(user.id, {
      password: input.password,
      recoverToken: null,
    });
  }
}
