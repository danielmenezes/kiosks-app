import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ChangeTerminalPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'currentPassword123' })
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'newPassword123' })
  newPassword: string;
}
