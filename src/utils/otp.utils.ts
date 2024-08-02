import getConfig from '../config/config';

export class OtpService {
  private static config = getConfig();

  static generateOtp(): string {
    const config = this.config;

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
