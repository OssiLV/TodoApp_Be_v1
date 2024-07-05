import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';

export enum Provider {
  GOOGLE = 'google',
  GITHUB = 'github',
}

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService /*private readonly usersService: UsersService*/,
  ) {}

  async validateOAuthLogin(
    thirdPartyProfile: any,
    provider: Provider,
  ): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

      const payload = {
        thirdPartyProfile,
        provider,
      };

      const jwt: string = sign(payload, this.configService.get('JWT_SECRET'), {
        expiresIn: 3600,
      });

      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
