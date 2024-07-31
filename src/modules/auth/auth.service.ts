import { BadRequestException, Injectable } from '@nestjs/common';
import { OtpService } from 'src/utils/otp.utils';
import { OtpSignInDto } from './dtos/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TokenService } from '../token/token.service';
import { Tokens } from '../token/types/tokens.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async signInRequest(signInDto: OtpSignInDto): Promise<any> {
    const { mobile } = signInDto;

    // Generate OTP
    const otp = OtpService.generateOtp();

    await this.prisma.user.upsert({
      where: { mobile },
      update: { otp, createdAt: new Date() },
      create: { mobile, otp },
    });

    return { mobile, otp }; // This is for demonstration; in a real app, do not send OTP in the response.
  }

  async verifyOtp(where: { mobile: string; otp: string }): Promise<Tokens> {
    const otpRecord = await this.prisma.user.findUnique({
      where,
    });
    if (!otpRecord) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.prisma.user.delete({
      where,
    });

    const tokens = await this.tokenService.getTokens(where.mobile);
    return tokens;
  }
}
