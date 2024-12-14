import axios from "axios";
import {
  defaultErrorMessage,
  IOauthUserInfo,
  IProviderCredential,
  OAuth2ClientEndpoints,
  OAuthProviderType,
} from "../definition";
import { OAuthProvider } from "../oauth-provider.abstract";
import {
  IExchangeToFacebookToken,
  IFacebookOauthUserApiResponse,
} from "./facebook.interface";

export class FacebookOauthProvider extends OAuthProvider {
  readonly endpoints: Readonly<OAuth2ClientEndpoints>;

  constructor(credential: IProviderCredential) {
    super(credential);
    this.endpoints = {
      oauth2TokenUrl: "https://graph.facebook.com/v21.0/oauth/access_token",
      oauth2UserInfoUrl: "https://graph.facebook.com/me",
    };
  }

  async verifyCode(code: string): Promise<IOauthUserInfo> {
    const tokenData = await this.exchangeCodeToToken(code);
    const facebookUserInfo = await this.fetchUserInfo(tokenData.access_token);

    return {
      type: OAuthProviderType.FACEBOOK,
      sub: facebookUserInfo.id,
      name: facebookUserInfo.name,
      email: facebookUserInfo.email,
      pictureUrl: facebookUserInfo?.picture?.data?.url || null,
    };
  }

  private async exchangeCodeToToken(
    code: string
  ): Promise<IExchangeToFacebookToken> {
    try {
      const response = await axios.get<IExchangeToFacebookToken>(
        this.endpoints.oauth2TokenUrl,
        {
          params: {
            client_id: this.credential.clientId,
            redirect_uri: this.credential.redirectUri,
            client_secret: this.credential.clientSecret,
            code,
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response.data.error?.message || defaultErrorMessage;
      throw new Error(`Failed to exchange code for token: ${errorMessage}`);
    }
  }

  private async fetchUserInfo(
    accessToken: string
  ): Promise<IFacebookOauthUserApiResponse> {
    try {
      console.log({ accessToken });
      const response = await axios.get<IFacebookOauthUserApiResponse>(
        this.endpoints.oauth2UserInfoUrl,
        {
          params: {
            access_token: accessToken,
            fields: "id,name,email,picture.width(200).height(200)",
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response.data.error.message || defaultErrorMessage;
      throw new Error(`Failed to fetch user info: ${errorMessage}`);
    }
  }
}
