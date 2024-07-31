import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types/tokens.types';

@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  private access_expires_in: number = Number(
    this.configService.get<string>('JWT_ACCESS_EXPIRES_IN_SEC'),
  );
  private refresh_expires_in: number = Number(
    this.configService.get<string>('JWT_REFRESH_EXPIRES_IN_SEC'),
  );

  async getTokens(mobile: string): Promise<Tokens> {
    const [access_token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { mobile },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.access_expires_in,
        },
      ),
      this.jwtService.signAsync(
        { mobile },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.refresh_expires_in,
        },
      ),
    ]);

    return {
      access_token,
      access_expires_in: this.access_expires_in,
      refreshToken,
      refresh_expires_in: this.refresh_expires_in,
    };
  }
}
