import {OAuthProvider} from "./oauth-provider.abstract";

import {GoogleOauthProvider} from "./google/google-oauth-provider";
import {IProviderCredential, OAuthProviderType} from "./definition";
import {ClientCredentialValidator} from "./client-credential.validator";

export class OauthProviderFactory {
  public static createProvider(
    credential: IProviderCredential,
    provider: OAuthProviderType
  ): OAuthProvider {

    ClientCredentialValidator.validate(credential);
    switch (provider) {
      case OAuthProviderType.GOOGLE:
        return new GoogleOauthProvider(credential);
      default:
        throw new Error(`This current ${provider} isn't support`);
    }
  }
}
