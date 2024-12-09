export interface IProviderCredential {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}
export declare enum OAuthProviderType {
    GOOGLE = "google",
    FACEBOOK = "facebook",
    DISCORD = "discord",
    TELEGRAM = "telegram",
    TWITTER = "twitter",
    GITHUB = "github",
    LINKEDIN = "linkedin",
    INSTAGRAM = "instagram",
    TIKTOK = "tiktok"
}
export interface OauthUserInfo {
    type: OAuthProviderType;
}
