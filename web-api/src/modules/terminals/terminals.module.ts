import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TerminalEntity } from './entities/terminal.entity';
import { TerminalRepository } from './terminal.repository';
import { ListTerminalsUseCase } from './use-cases/list-terminals.use-case';
import { ChangeTerminalPasswordUseCase } from './use-cases/change-terminal-password.use-case';
import { TerminalsController } from './terminals.controller';

@Module({
  imports: [SequelizeModule.forFeature([TerminalEntity])],
  controllers: [TerminalsController],
  providers: [
    TerminalRepository,
    ListTerminalsUseCase,
    ChangeTerminalPasswordUseCase,
  ],
  exports: [TerminalRepository, SequelizeModule],
})
export class TerminalsModule {}
