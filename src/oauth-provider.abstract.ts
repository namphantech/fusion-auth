import {IProviderCredential, OauthUserInfo} from "./definition";

export abstract class OAuthProvider {
  protected credential: IProviderCredential;
  constructor(credential: IProviderCredential) {
    this.credential = credential;
  }
  abstract verifyCode(code: string): Promise<OauthUserInfo>;

}
