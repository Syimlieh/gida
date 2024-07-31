import { Injectable } from '@nestjs/common';
import { OtpService } from 'src/utils/otp.utils';
import { OtpSignInDto } from './dtos/auth.dto';
import config from '../../config/config';

@Injectable()
export class AuthService {
  async signInRequest(signInDto: OtpSignInDto): Promise<any> {
    const { mobile } = signInDto;

    // Generate OTP
    const otp = OtpService.generateOtp();

    return { mobile, otp }; // This is for demonstration; in a real app, do not send OTP in the response.
  }

  async verifyOtp({
    mobile,
    otp,
  }: {
    mobile: string;
    otp: string;
  }): Promise<boolean> {
    const storedOtp = config.defaultOtp;
    console.log('otp', storedOtp, otp);
    if (storedOtp && storedOtp === otp) {
      return true;
    }

    return false;
  }
}
