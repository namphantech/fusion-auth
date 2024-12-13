export interface IProviderCredential {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}
export declare enum OAuthProviderType {
    GOOGLE = "google",
    FACEBOOK = "facebook",
    GITHUB = "github",
    DISCORD = "discord"
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
