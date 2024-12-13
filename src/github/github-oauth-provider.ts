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
    try {
      const tokenData = await this.exchangeCodeToToken(code);
      console.log({ tokenData });
      const response = await axios.get<IGithubOauthUserApiResponse>(
        this.endpoints.oauth2UserInfoUrl,
        {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        }
      );
      const githubUserInfo = response.data;
      const githubUserEmail = await this.fetchGithubUserEmail(
        tokenData.access_token
      );
      return {
        type: OAuthProviderType.GITHUB,
        sub: githubUserInfo.id.toString(),
        name: githubUserInfo.name,
        email: githubUserEmail,
        pictureUrl: githubUserInfo.avatar_url,
      };
    } catch (error) {
      throw error;
    }
  }

  private async exchangeCodeToToken(
    code: string
  ): Promise<IExchangeToGithubToken> {
    const response = await axios.post<IExchangeToGithubToken>(
      this.endpoints.oauth2TokenUrl,
      {
        client_id: this.credential.clientId,
        redirect_uri: this.credential.redirectUri,
        client_secret: this.credential.clientSecret,
        code,
      },
      {
        headers: {
          "Accept": "application/json",
        },
      }
    );
    return response.data;
  }

  private async fetchGithubUserEmail(token: string): Promise<string> {
    const response = await axios.get<IGithubUserEmail[]>(
      `${this.endpoints.oauth2UserInfoUrl}/emails`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const githubUserEmail = response.data[0]?.email;
    return githubUserEmail;
  }
}
