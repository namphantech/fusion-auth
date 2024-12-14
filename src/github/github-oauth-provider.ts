import axios from "axios";
import {
  IOauthUserInfo,
  IProviderCredential,
  OAuth2ClientEndpoints,
  OAuthProviderType,
} from "../definition";
import { OAuthProvider } from "../oauth-provider.abstract";
import {
  IExchangeToGithubToken,
  IGithubOauthUserApiResponse,
  IGithubUserEmail,
} from "./github.interface";

export class GithubOauthProvider extends OAuthProvider {
  readonly endpoints: Readonly<OAuth2ClientEndpoints>;

  constructor(credential: IProviderCredential) {
    super(credential);
    this.endpoints = {
      oauth2TokenUrl: "https://github.com/login/oauth/access_token",
      oauth2UserInfoUrl: "https://api.github.com/user",
    };
  }

  async verifyCode(code: string): Promise<IOauthUserInfo> {
    const tokenData = await this.exchangeCodeToToken(code);
    const githubUserInfo = await this.fetchUserInfo(tokenData.access_token);
    const primaryEmail = await this.fetchPrimaryEmail(tokenData.access_token);

    return {
      type: OAuthProviderType.GITHUB,
      sub: githubUserInfo.id.toString(),
      name: githubUserInfo.name,
      email: primaryEmail,
      pictureUrl: githubUserInfo.avatar_url,
    };
  }

  private async exchangeCodeToToken(
    code: string
  ): Promise<IExchangeToGithubToken> {
    try {
      const response = await axios.post<IExchangeToGithubToken>(
        this.endpoints.oauth2TokenUrl,
        {
          client_id: this.credential.clientId,
          redirect_uri: this.credential.redirectUri,
          client_secret: this.credential.clientSecret,
          code,
        },
        {
          headers: { Accept: "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to exchange code for token: ${error.message}`);
    }
  }

  private async fetchUserInfo(
    accessToken: string
  ): Promise<IGithubOauthUserApiResponse> {
    try {
      const response = await axios.get<IGithubOauthUserApiResponse>(
        this.endpoints.oauth2UserInfoUrl,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data?.message;
      throw new Error(`Failed to fetch user info: ${errorMessage}`);
    }
  }

  private async fetchPrimaryEmail(accessToken: string): Promise<string> {
    try {
      const response = await axios.get<IGithubUserEmail[]>(
        `${this.endpoints.oauth2UserInfoUrl}/emails`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const primaryEmail = response.data[0].email as string;
      return primaryEmail;
    } catch (error) {
      throw new Error(`Failed to fetch user email: ${error.message}`);
    }
  }
}
