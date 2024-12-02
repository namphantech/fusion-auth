"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OauthProviderFactory = void 0;
const google_oauth_provider_1 = require("./google/google-oauth-provider");
const definition_1 = require("./definition");
const client_credential_validator_1 = require("./client-credential.validator");
class OauthProviderFactory {
    static createProvider(credential, provider) {
        client_credential_validator_1.ClientCredentialValidator.validate(credential);
        switch (provider) {
            case definition_1.OAuthProviderType.GOOGLE:
                return new google_oauth_provider_1.GoogleOauthProvider(credential);
            default:
                throw new Error(`This current ${provider} isn't support`);
        }
    }
}
exports.OauthProviderFactory = OauthProviderFactory;
