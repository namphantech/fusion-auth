import { OAuthProvider } from "./oauth-provider.abstract";
import { IProviderCredential, OAuthProviderType } from "./definition";
export declare class OauthProviderFactory {
    static createProvider(credential: IProviderCredential, provider: OAuthProviderType): OAuthProvider;
}
