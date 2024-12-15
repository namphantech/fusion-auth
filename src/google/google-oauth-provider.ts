import axios from "axios";
import { OAuthProvider } from "../oauth-provider.abstract";
import {
  IGoogleOauthUserApiResponse,
  IExchangeToGoogleToken,
} from "./google.interface";
import {
  defaultErrorMessage,
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
    await this.validateInput(code);
    
    const tokenData = await this.exchangeCodeToToken(code);
    const googleUserInfo = await this.fetchUserInfo(tokenData.access_token);
    return {
      type: OAuthProviderType.GOOGLE,
      sub: googleUserInfo.sub,
      name: googleUserInfo.name,
      pictureUrl: googleUserInfo.picture,
      email: googleUserInfo.email,
    };
  }

  private async exchangeCodeToToken(
    code: string
  ): Promise<IExchangeToGoogleToken> {
    try {
      const response = await axios.post<IExchangeToGoogleToken>(
        this.endpoints.oauth2TokenUrl,
        {
          client_id: this.credential.clientId,
          client_secret: this.credential.clientSecret,
          redirect_uri: this.credential.redirectUri,
          code,
          grant_type: "authorization_code",
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data?.error || defaultErrorMessage;
      throw new Error(`Failed to exchange code for token: ${errorMessage}`);
    }
  }

  private async fetchUserInfo(
    accessToken: string
  ): Promise<IGoogleOauthUserApiResponse> {
    try {
      const response = await axios.get<IGoogleOauthUserApiResponse>(
        this.endpoints.oauth2UserInfoUrl,
        {
          params: {
            access_token: accessToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response.data?.error_description || defaultErrorMessage;
      throw new Error(`Failed to fetch user info: ${errorMessage}`);
    }
  }
}
