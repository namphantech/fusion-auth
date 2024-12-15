import { IOauthUserInfo, IProviderCredential } from "./definition";

export abstract class OAuthProvider {
  protected credential: IProviderCredential;
  protected constructor(credential: IProviderCredential) {
    this.credential = credential;
  }
  abstract verifyCode(code: string): Promise<IOauthUserInfo>;

  async validateInput(code: string): Promise<void> {
    if (!code) {
      throw new Error("Invalid input: Authorization code is required.");
    }
  }
}
