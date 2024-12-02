import { OAuthProvider } from "../oauth-provider.abstract";
import { OauthGoogleUserInfo, OAuth2ClientEndpoints } from "./google.interface";
import { IProviderCredential } from "../definition";
export declare class GoogleOauthProvider extends OAuthProvider {
    readonly endpoints: Readonly<OAuth2ClientEndpoints>;
    constructor(credential: IProviderCredential);
    verifyCode(code: string): Promise<OauthGoogleUserInfo>;
    private exchangeCodeToToken;
}
