import { IOauthUserInfo, IProviderCredential, OAuth2ClientEndpoints } from "../definition";
import { OAuthProvider } from "../oauth-provider.abstract";
export declare class FacebookOauthProvider extends OAuthProvider {
    readonly endpoints: Readonly<OAuth2ClientEndpoints>;
    constructor(credential: IProviderCredential);
    verifyCode(code: string): Promise<IOauthUserInfo>;
    private exchangeCodeToToken;
}
