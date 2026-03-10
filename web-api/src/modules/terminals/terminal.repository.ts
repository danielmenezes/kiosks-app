import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TerminalEntity } from './entities/terminal.entity';

@Injectable()
export class TerminalRepository {
  constructor(
    @InjectModel(TerminalEntity)
    private readonly terminalEntity: typeof TerminalEntity,
  ) {}

  async getByName(name: string): Promise<TerminalEntity | null> {
    return this.terminalEntity.findOne({ where: { name } });
  }

  async findAllNames(): Promise<TerminalEntity[]> {
    const rows = await this.terminalEntity.findAll({
      attributes: ['id', 'name'],
      raw: true,
    });
    return rows;
  }

  async getById(id: number): Promise<TerminalEntity | null> {
    return this.terminalEntity.findByPk(id);
  }

  async updatePassword(
    id: number,
    newPasswordHash: string,
  ): Promise<number | [number]> {
    return this.terminalEntity.update(
      { password: newPasswordHash },
      { where: { id } },
    );
  }
}
