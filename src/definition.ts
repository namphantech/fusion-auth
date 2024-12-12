export interface IProviderCredential {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}
export enum OAuthProviderType {
  GOOGLE = "google",
  FACEBOOK = "facebook",
  DISCORD = "discord",
  TELEGRAM = "telegram",
  TWITTER = "twitter",
  GITHUB = "github",
  LINKEDIN = "linkedin",
  INSTAGRAM = "instagram",
  TIKTOK = "tiktok",
}

export interface OAuth2ClientEndpoints {
  oauth2TokenUrl: string;

  oauth2UserInfoUrl: string;
}

export interface IOauthUserInfo {
  type: OAuthProviderType;
  sub: string;
  email: string;
  pictureUrl?: string;
  name?: string;
}
