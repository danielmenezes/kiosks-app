import { ApiProperty } from '@nestjs/swagger';

export class TerminalResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
