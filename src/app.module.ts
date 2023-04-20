import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { UsersModule } from './modules/users/users.module';
import { RolesGuard } from './utils/guards/roles.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import { NewThrottlerGuard } from './utils/guards/throttler.guard';
import { BullModule } from '@nestjs/bull';
import { RolesModule } from './modules/roles/roles.module';
import { ClaimsModule } from './modules/claims/claims.module';
import { ClaimsGuard } from './utils/guards/claims.guard';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_URI,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASS,
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    ClaimsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ClaimsGuard,
    },
    {
      provide: APP_GUARD,
      useClass: NewThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
