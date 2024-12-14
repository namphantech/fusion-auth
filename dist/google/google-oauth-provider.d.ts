import { OAuthProvider } from "../oauth-provider.abstract";
import { IOauthUserInfo, IProviderCredential, OAuth2ClientEndpoints } from "../definition";
export declare class GoogleOauthProvider extends OAuthProvider {
    readonly endpoints: Readonly<OAuth2ClientEndpoints>;
    constructor(credential: IProviderCredential);
    verifyCode(code: string): Promise<IOauthUserInfo>;
    private exchangeCodeToToken;
    private fetchUserInfo;
}
