import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { TerminalRepository } from 'src/modules/terminals/terminal.repository';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly terminalRepository: TerminalRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ name, password }: LoginDto) {
    const terminalModel = await this.terminalRepository.getByName(name);

    if (!terminalModel) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const terminal = terminalModel.toJSON();

    const isPasswordValid = await bcrypt.compare(password, terminal.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      sub: terminal.id,
      name: terminal.name,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '30d',
      }),
      terminal: {
        id: terminal.id,
        name: terminal.name,
      },
    };
  }
}
