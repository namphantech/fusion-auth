"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OauthProviderFactory = void 0;
const google_oauth_provider_1 = require("./google/google-oauth-provider");
const definition_1 = require("./definition");
const client_credential_validator_1 = require("./client-credential.validator");
const facebook_oauth_provider_1 = require("./facebook/facebook-oauth-provider");
const github_oauth_provider_1 = require("./github/github-oauth-provider");
const discord_oauth_provider_1 = require("./discord/discord-oauth-provider");
class OauthProviderFactory {
    static createProvider(credential, provider) {
        client_credential_validator_1.ClientCredentialValidator.validate(credential);
        switch (provider) {
            case definition_1.OAuthProviderType.GOOGLE:
                return new google_oauth_provider_1.GoogleOauthProvider(credential);
            case definition_1.OAuthProviderType.FACEBOOK:
                return new facebook_oauth_provider_1.FacebookOauthProvider(credential);
            case definition_1.OAuthProviderType.GITHUB:
                return new github_oauth_provider_1.GithubOauthProvider(credential);
            case definition_1.OAuthProviderType.DISCORD:
                return new discord_oauth_provider_1.DiscordOauthProvider(credential);
            default:
                throw new Error(`This current ${provider} provider isn't support`);
        }
    }
}
exports.OauthProviderFactory = OauthProviderFactory;
