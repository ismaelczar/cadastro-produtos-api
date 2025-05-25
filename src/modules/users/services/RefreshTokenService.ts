import { HttpResponse } from '@config/httpResponse';
import { sign, verify } from 'jsonwebtoken';

interface IRefreshTokenResponse {
  newAccessToken: string;
  newRefreshToken: string;
}

interface IRefreshTokenPayload {
  sub: string;
}

export class RefreshTokenService {
  constructor() {}

  async execute(
    refreshToken: string,
  ): Promise<HttpResponse<IRefreshTokenResponse>> {
    try {
      if (!refreshToken) {
        return {
          statusCode: 401,
          body: 'Refresh token is missing',
        };
      }

      const decoded = verify(refreshToken, 'a11113006a7272e0cfad95952e7e62f3');
      const { sub } = decoded as IRefreshTokenPayload;

      const newAccessToken = sign({}, 'a11113006a7272e0cfad95952e7e62f3', {
        subject: sub,
        expiresIn: '15m',
      });

      const newRefreshToken = sign({}, 'a11113006a7272e0cfad95952e7e62f3', {
        subject: sub,
        expiresIn: '7d',
      });

      return {
        statusCode: 200,
        body: {
          newAccessToken,
          newRefreshToken,
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Internal server error',
      };
    }
  }
}
