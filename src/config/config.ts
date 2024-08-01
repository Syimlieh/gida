export default {
  otpLength: parseInt(process.env.OTP_LENGTH) || 6,
  defaultOtp: process.env.DEFAULT_OTP || '123456',
  otpExpiry: parseInt(process.env.OTP_EXPIRY) || 300, // in seconds
  maxQuantity: parseInt(process.env.MAX_QUANTITY) || 10,
};
