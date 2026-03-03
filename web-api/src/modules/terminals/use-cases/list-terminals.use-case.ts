import { Injectable } from '@nestjs/common';
import { TerminalRepository } from '../terminal.repository';
import { TerminalEntity } from 'src/modules/auth/entities/terminal.entity';

@Injectable()
export class ListTerminalsUseCase {
  constructor(private readonly terminalRepository: TerminalRepository) {}

  async execute(): Promise<TerminalEntity[]> {
    return this.terminalRepository.findAllNames();
  }
}
