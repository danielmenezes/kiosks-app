import { Injectable } from '@nestjs/common';
import { TerminalRepository } from '../terminal.repository';

@Injectable()
export class ListTerminalsUseCase {
  constructor(private readonly terminalRepository: TerminalRepository) {}

  async execute(): Promise<string[]> {
    return this.terminalRepository.findAllNames();
  }
}
