export default () => ({
  otpLength: parseInt(process.env.OTP_LENGTH, 10) || 6,
  defaultOtp: process.env.DEFAULT_OTP || '123456',
  otpExpiry: parseInt(process.env.OTP_EXPIRY, 10) || 300, // in seconds
  maxQuantity: parseInt(process.env.MAX_QUANTITY, 10) || 10,

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    ttl: parseInt(process.env.CACHE_TTL, 10) || 30, // time to live in seconds
  },
});
