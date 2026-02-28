import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { TerminalRepository } from '../terminal.repository';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly terminalRepository: TerminalRepository,
    private jwtService: JwtService,
  ) {}

  async execute({ name, password }: LoginDto) {
    const terminal = await this.terminalRepository.getByName(name);

    if (!terminal) {
      throw new HttpException('Credenciais inválidas', HttpStatus.BAD_REQUEST);
    }

    const isPasswordValid = await bcrypt.compare(password, terminal.password);

    if (!isPasswordValid) {
      throw new HttpException('Credenciais inválidas', HttpStatus.BAD_REQUEST);
    }

    const payload = {
      sub: terminal.id,
      name: terminal.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      terminal: terminal.name,
    };
  }
}
