import config from '../config/config';

export class OtpService {
  static generateOtp(): string {
    if (config.defaultOtp) {
      return config.defaultOtp;
    }

    let otp = '';
    for (let i = 0; i < config.otpLength; i++) {
      otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
  }
}
