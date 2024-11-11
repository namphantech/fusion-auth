import { OAuthProvider } from "./oauth-provider.abstract";
import { OauthSocialProvider } from "./definition";
import { IProviderCredential } from "./definition";
export declare class OauthProviderFactory {
    static createProvider(credential: IProviderCredential, provider: OauthSocialProvider): OAuthProvider;
}
