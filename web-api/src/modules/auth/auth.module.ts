import { Global, Module } from '@nestjs/common';
import { LoginUseCase } from './use-cases/login.use-case';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/jwt/jwt-strategy';
import { AuthController } from './auth.controller';
import { TerminalRepository } from '../terminals/terminal.repository';
import { TerminalsModule } from '../terminals/terminals.module';

@Global()
@Module({
  imports: [JwtModule.register({}), TerminalsModule],
  controllers: [AuthController],
  providers: [LoginUseCase, TerminalRepository, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
