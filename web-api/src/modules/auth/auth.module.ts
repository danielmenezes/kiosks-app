import { Global, Module } from '@nestjs/common';
import { LoginUseCase } from './use-cases/login.use-case';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/jwt/jwt-strategy';
import { AuthController } from './auth.controller';
import { TerminalRepository } from './terminal.repository';
import { TerminalEntity } from './entities/terminal.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Global()
@Module({
  imports: [
    JwtModule.register({}),
    SequelizeModule.forFeature([TerminalEntity]),
  ],
  controllers: [AuthController],
  providers: [
    // UseCases
    LoginUseCase,

    // Repository
    TerminalRepository,

    // Strategy
    JwtStrategy,
  ],
  exports: [JwtStrategy],
})
export class AuthModule {}
