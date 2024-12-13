export interface IExchangeToGithubToken {
    access_token: string;
    scope: string;
    token_type: string;
}
export interface IGithubOauthUserApiResponse {
    id: number;
    name: string;
    avatar_url: string;
}
export interface IGithubUserEmail {
    email: string;
    primary: boolean;
    verified: boolean;
    visibility?: string;
}
