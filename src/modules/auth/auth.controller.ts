import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OtpSignInDto, OtpVerifyDto } from './dtos/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login/request')
  @ApiOperation({ summary: 'Otp signin request' })
  otpSignInRequest(@Body() signInDto: OtpSignInDto) {
    return this.authService.signInRequest(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/verify')
  @ApiOperation({ summary: 'Verify OTP' })
  async otpSignInVerify(@Body() signInDto: OtpVerifyDto) {
    return this.authService.verifyOtp(signInDto);
  }
}
