import { IProviderCredential, OauthUserInfo } from "./definition";
export declare abstract class OAuthProvider {
    protected credential: IProviderCredential;
    constructor(credential: IProviderCredential);
    abstract verifyCode(code: string): Promise<OauthUserInfo>;
}
