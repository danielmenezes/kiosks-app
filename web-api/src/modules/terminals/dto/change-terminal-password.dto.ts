import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ChangeTerminalPasswordDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  terminalId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'currentPassword123' })
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'newPassword123' })
  newPassword: string;
}
