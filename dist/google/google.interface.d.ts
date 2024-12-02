import { OauthUserInfo } from "../definition";
export interface OAuth2ClientEndpoints {
    /**
     * The base endpoint for token retrieval
     * .
     * @example
     * 'https://oauth2.googleapis.com/token'
     */
    oauth2TokenUrl: string;
    /**
     * The base endpoint to user info.
     *
     * @example
     * 'https://www.googleapis.com/oauth2/v3/userinfo'
     */
    oauth2UserInfoUrl: string;
}
export interface ExchangeToGoogleToken {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    id_token: string;
}
export interface OauthGoogleUserInfo extends OauthUserInfo {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
}
