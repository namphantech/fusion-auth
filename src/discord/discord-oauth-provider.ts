import axios from "axios";
import {
  IOauthUserInfo,
  IProviderCredential,
  OAuth2ClientEndpoints,
  OAuthProviderType,
} from "../definition";
import { OAuthProvider } from "../oauth-provider.abstract";
import {
  IDiscordOauthUserApiResponse,
  IExchangeToDiscordToken,
} from "./discord.interface";

export class DiscordOauthProvider extends OAuthProvider {
  readonly endpoints: Readonly<OAuth2ClientEndpoints>;

  constructor(credential: IProviderCredential) {
    super(credential);
    this.endpoints = {
      oauth2TokenUrl: "https://discord.com/api/oauth2/token",
      oauth2UserInfoUrl: "https://discord.com/api/v10/users/@me",
    };
  }

  async verifyCode(code: string): Promise<IOauthUserInfo> {
    await this.validateInput(code);

    const tokenData = await this.exchangeCodeToToken(code);
    const discordUserInfo = await this.fetchUserInfo(tokenData.access_token);

    return {
      type: OAuthProviderType.DISCORD,
      sub: discordUserInfo.id,
      name: discordUserInfo.username,
      email: discordUserInfo.email,
      pictureUrl: discordUserInfo.avatar
        ? `https://cdn.discordapp.com/avatars/${discordUserInfo.id}/${discordUserInfo.avatar}`
        : null,
    };
  }

  private async exchangeCodeToToken(
    code: string
  ): Promise<IExchangeToDiscordToken> {
    try {
      const response = await axios.post<IExchangeToDiscordToken>(
        this.endpoints.oauth2TokenUrl,
        {
          client_id: this.credential.clientId,
          redirect_uri: this.credential.redirectUri,
          client_secret: this.credential.clientSecret,
          code,
          grant_type: "authorization_code",
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response.data?.error_description || error.message;
      throw new Error(`Failed to exchange code for token: ${errorMessage}`);
    }
  }

  private async fetchUserInfo(
    accessToken: string
  ): Promise<IDiscordOauthUserApiResponse> {
    try {
      const response = await axios.get<IDiscordOauthUserApiResponse>(
        this.endpoints.oauth2UserInfoUrl,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user info: ${error.message}`);
    }
  }
}
