import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OtpSignInDto, OtpVerifyDto } from './dtos/auth.dto';
import { Public } from 'src/decorators';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public
  @HttpCode(HttpStatus.OK)
  @Post('login/request')
  @ApiOperation({ summary: 'Otp signin request' })
  otpSignInRequest(@Body() signInDto: OtpSignInDto) {
    return this.authService.signInRequest(signInDto);
  }

  @Public
  @HttpCode(HttpStatus.OK)
  @Post('login/verify')
  @ApiOperation({ summary: 'Verify OTP' })
  async otpSignInVerify(@Body() signInDto: OtpVerifyDto) {
    return this.authService.verifyOtp(signInDto);
  }
}
