import { OAuthProvider } from "./oauth-provider.abstract";

import { GoogleOauthProvider } from "./google/google-oauth-provider";
import { OauthSocialProvider } from "./definition";
import { IProviderCredential } from "./definition";
import {CredentialValidator} from "./client-credential.validator";

export class OauthProviderFactory {
  public static createProvider(
    credential: IProviderCredential,
    provider: OauthSocialProvider
  ): OAuthProvider {

    CredentialValidator.validate(credential);
    switch (provider) {
      case OauthSocialProvider.GOOGLE:
        return new GoogleOauthProvider(credential);
      default:
        throw new Error(`The ${provider} isn't support`);
    }
  }
}
