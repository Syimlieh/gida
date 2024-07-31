import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class OtpSignInDto {
  @ApiProperty({
    name: 'mobile',
    required: true,
    default: '9878776765',
  })
  @IsMobilePhone('en-IN')
  @IsNotEmpty({ message: 'Mobile is required.' })
  mobile: string;
}

export class OtpVerifyDto {
  @ApiProperty({
    name: 'mobile',
    required: true,
    default: '9878776765',
  })
  @IsMobilePhone('en-IN')
  @IsNotEmpty({ message: 'Mobile is required.' })
  mobile: string;

  @ApiProperty({
    name: 'otp',
    required: true,
    default: '123456',
  })
  @IsNotEmpty({ message: 'Otp is required.' })
  otp: string;
}
