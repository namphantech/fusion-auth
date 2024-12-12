import axios from "axios";
import { OAuthProvider } from "../oauth-provider.abstract";
import {
  IGoogleOauthUserApiResponse,
  IExchangeToGoogleToken,
} from "./google.interface";
import {
  IOauthUserInfo,
  IProviderCredential,
  OAuth2ClientEndpoints,
  OAuthProviderType,
} from "../definition";

export class GoogleOauthProvider extends OAuthProvider {
  readonly endpoints: Readonly<OAuth2ClientEndpoints>;

  constructor(credential: IProviderCredential) {
    super(credential);
    this.endpoints = {
      oauth2TokenUrl: "https://oauth2.googleapis.com/token",
      oauth2UserInfoUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
    };
  }

  public async verifyCode(code: string): Promise<IOauthUserInfo> {
    try {
      const tokenData = await this.exchangeCodeToToken(code);
      const response = await axios.get<IGoogleOauthUserApiResponse>(
        this.endpoints.oauth2UserInfoUrl,
        {
          params: { access_token: tokenData.access_token },
        }
      );
      const googleUserInfo = response.data;

      return {
        type: OAuthProviderType.GOOGLE,
        sub: googleUserInfo.sub,
        name: googleUserInfo.name,
        pictureUrl: googleUserInfo.picture,
        email: googleUserInfo.email,
      };
    } catch (error) {
      throw error;
    }
  }

  private async exchangeCodeToToken(
    code: string
  ): Promise<IExchangeToGoogleToken> {
    const response = await axios.post<IExchangeToGoogleToken>(
      this.endpoints.oauth2TokenUrl,
      {
        ...this.credential,
        code,
        grant_type: "authorization_code",
      }
    );
    return response.data;
  }
}
