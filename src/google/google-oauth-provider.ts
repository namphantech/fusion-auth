import axios from "axios";
import { OAuthProvider } from "../oauth-provider.abstract";
import {ExchangeToGoogleToken, OAuth2ClientEndpoints} from "./google.interface";
import {IProviderCredential, OauthUserInfo} from "../definition";

export class GoogleOauthProvider extends OAuthProvider {
  readonly endpoints: Readonly<OAuth2ClientEndpoints>;

  constructor(credential: IProviderCredential) {
    super(credential);
    this.endpoints = {
      oauth2TokenUrl: "https://oauth2.googleapis.com/token",
      oauth2UserInfoUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
    };
  }

  async verifyCode(code: string): Promise<OauthUserInfo> {
    try {
      const tokenData = await this.exchangeCodeToToken(code);
      const userInfo =  await this.fetchUserInfo(tokenData.access_token);

      return {
        email: userInfo.email,
        sub: userInfo.sub,
        picture: userInfo.picture,
        username: userInfo.name,

      }
    } catch (error) {
      if (error.response) {
        throw new Error(`OAuth error: ${error.response.data}`);
      }
      throw new Error(`OAuth error: ${error.message}`);
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

  private async fetchUserInfo(accessToken: string) {
    const response = await axios.get(this.endpoints.oauth2UserInfoUrl, {
      params: { access_token: accessToken },
    });
    return response.data;
  }

}
