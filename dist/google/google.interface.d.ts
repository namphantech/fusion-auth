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
