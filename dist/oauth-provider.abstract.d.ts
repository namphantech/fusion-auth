import { IOauthUserInfo, IProviderCredential } from "./definition";
export declare abstract class OAuthProvider {
    protected credential: IProviderCredential;
    protected constructor(credential: IProviderCredential);
    abstract verifyCode(code: string): Promise<IOauthUserInfo>;
}
