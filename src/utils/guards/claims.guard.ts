import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CLAIMS_KEY } from '../decorators/claims.decorator';
@Injectable()
export class ClaimsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredClaims = this.reflector.getAllAndOverride<string[]>(
      CLAIMS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredClaims) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return requiredClaims.some((claims) => user.claims?.includes(claims));
  }
}
