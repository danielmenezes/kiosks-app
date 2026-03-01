import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginUseCase } from './use-cases/login.use-case';
import { LoginDto } from './dto/login.dto';
import { Auth } from 'src/common/jwt/auth';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('Auth')
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @ApiOperation({ summary: 'Authenticate terminal and return JWT' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'Access token generated.',
    type: LoginResponseDto,
  })
  login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }

  @Post('verify-credentials')
  @Auth()
  verifyCredentials() {
    return true;
  }
}
