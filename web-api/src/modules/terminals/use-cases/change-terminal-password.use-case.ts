import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TerminalRepository } from '../terminal.repository';

@Injectable()
export class ChangeTerminalPasswordUseCase {
  constructor(private readonly terminalRepository: TerminalRepository) {}

  async execute(id: number, oldPassword: string, newPassword: string) {
    const terminalModel = await this.terminalRepository.getById(id);

    if (!terminalModel) {
      throw new HttpException('Terminal not found', HttpStatus.NOT_FOUND);
    }

    const terminal = terminalModel.toJSON();

    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      terminal.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Senha atual incorreta', HttpStatus.BAD_REQUEST);
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    await this.terminalRepository.updatePassword(id, newHash);

    return { success: true };
  }
}
