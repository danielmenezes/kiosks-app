import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ListTerminalsUseCase } from './use-cases/list-terminals.use-case';
import { ChangeTerminalPasswordUseCase } from './use-cases/change-terminal-password.use-case';
import { ChangeTerminalPasswordDto } from './dto/change-terminal-password.dto';
import { Auth } from 'src/common/jwt/auth';

@ApiTags('Terminals')
@Controller('terminals')
export class TerminalsController {
  constructor(
    private readonly listTerminals: ListTerminalsUseCase,
    private readonly changePassword: ChangeTerminalPasswordUseCase,
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'List terminal names' })
  @ApiResponse({
    status: 200,
    description: 'Array of terminal names',
    type: String,
    isArray: true,
  })
  list() {
    return this.listTerminals.execute();
  }

  @Post('change-password')
  @Auth()
  @ApiOperation({ summary: "Change terminal's password" })
  @ApiBody({ type: ChangeTerminalPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Operation result',
    schema: { example: { success: true } },
  })
  changePasswordEndpoint(
    @Req() req: any,
    @Body() dto: ChangeTerminalPasswordDto,
  ) {
    const terminalId = req.user?.terminalId;
    return this.changePassword.execute(
      terminalId,
      dto.oldPassword,
      dto.newPassword,
    );
  }
}
