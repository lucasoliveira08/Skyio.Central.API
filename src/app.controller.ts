import {
  Controller,
  Request,
  Post,
  Res,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { Public } from './utils/decorators/isPublic.decorator';
import {
  CreateUserDTO,
  LoginUserDTO,
  RecoverPasswordDTO,
  RequestRecoverPasswordDTO,
} from './modules/users/dto/Users.dto';
import { UsersService } from './modules/users/users.service';
import 'dotenv/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() _: LoginUserDTO,
    @Request() req,
    @Res({ passthrough: true }) res,
  ) {
    return await this.authService.signIn(req.user, res);
  }

  @Public()
  @Post('auth/register')
  async register(@Body() body: CreateUserDTO, @Res({ passthrough: true }) res) {
    const user = await this.usersService.createUser(body);

    return await this.authService.signIn(user, res);
  }

  @Post('auth/jwt')
  async verifyJwt(
    @Request() req,
    @Res({ passthrough: true }) res,
  ): Promise<{
    expired: boolean;
    user?: any;
    expiresIn?: number;
  }> {
    const { jwt } = req.cookies;

    if (jwt) {
      const { expired, expiresIn, id } = await this.authService.verifyJwt(jwt);

      if (expired) {
        res.cookie('jwt', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          path: '/',
          maxAge: 0,
        });

        return {
          expired: true,
        };
      }

      const user = await this.usersService.findOneUser({ id });

      return {
        expired: false,
        expiresIn,
        user,
      };
    }

    return {
      expired: true,
    };
  }

  @Post('auth/logout')
  async logout(@Res({ passthrough: true }) res): Promise<{ logout: boolean }> {
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });

    return {
      logout: true,
    };
  }

  @Public()
  @Post('auth/requestResetPassword')
  async requestResetPassword(
    @Body() input: RequestRecoverPasswordDTO,
    @Res({ passthrough: true }) res,
  ): Promise<any> {
    this.authService.requestResetPassword(input);
    res.status(204);
  }

  @Public()
  @Patch('auth/resetPassword/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() input: RecoverPasswordDTO,
    @Res({ passthrough: true }) res,
  ): Promise<any> {
    this.authService.resetPassword(token, input);
    res.status(204);
  }
}
