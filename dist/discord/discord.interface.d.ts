export interface IExchangeToDiscordToken {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}
export interface IDiscordOauthUserApiResponse {
    id: string;
    username: string;
    avatar?: string;
    email: string;
}
