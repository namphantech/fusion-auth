import { OAuthProvider } from "../oauth-provider.abstract";
import { OAuth2ClientEndpoints } from "./google.interface";
import { IProviderCredential, OauthUserInfo } from "../definition";
export declare class GoogleOauthProvider extends OAuthProvider {
    readonly endpoints: Readonly<OAuth2ClientEndpoints>;
    constructor(credential: IProviderCredential);
    verifyCode(code: string): Promise<OauthUserInfo>;
    private exchangeCodeToToken;
    private fetchUserInfo;
}
