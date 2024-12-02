import axios from "axios";
import {OAuthProvider} from "../oauth-provider.abstract";
import {
  ExchangeToGoogleToken,
  OauthGoogleUserInfo,
  OAuth2ClientEndpoints,
} from "./google.interface";
import {IProviderCredential, OAuthProviderType} from "../definition";

export class GoogleOauthProvider extends OAuthProvider {
  readonly endpoints: Readonly<OAuth2ClientEndpoints>;

  constructor(credential: IProviderCredential) {
    super(credential);
    this.endpoints = {
      oauth2TokenUrl: "https://oauth2.googleapis.com/token",
      oauth2UserInfoUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
    };
  }

  async verifyCode(code: string): Promise<OauthGoogleUserInfo> {
    try {
      const tokenData = await this.exchangeCodeToToken(code);
      const response = await axios.get<OauthGoogleUserInfo>(this.endpoints.oauth2UserInfoUrl, {
        params: { access_token: tokenData.access_token },
      });
      const googleUserInfo = response.data;

      return {
        type: OAuthProviderType.GOOGLE,
        sub: googleUserInfo.sub,
        name: googleUserInfo.name,
        given_name: googleUserInfo.given_name,
        family_name: googleUserInfo.family_name,
        picture: googleUserInfo.picture,
        email: googleUserInfo.email,
        email_verified: googleUserInfo.email_verified,
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        throw error
      }
      console.error(error);
      throw error;
    }
  }

  private async exchangeCodeToToken(code: string): Promise<ExchangeToGoogleToken> {
    const response = await axios.post<ExchangeToGoogleToken>(
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
