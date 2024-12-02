import {OauthUserInfo, IProviderCredential} from "./definition";

export abstract class OAuthProvider {
  protected credential: IProviderCredential;
  protected constructor(credential: IProviderCredential) {
    this.credential = credential;
  }
  abstract verifyCode(code: string): Promise<OauthUserInfo>;

}
