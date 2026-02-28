import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TerminalEntity } from './entities/terminal.entity';

@Injectable()
export class TerminalRepository {
  constructor(
    @InjectModel(TerminalEntity)
    private readonly terminalEntity: typeof TerminalEntity,
  ) {}

  async getByName(name: string): Promise<TerminalEntity> {
    return await this.terminalEntity.findOne({
      where: { name },
    });
  }
}
