"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordOauthProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const definition_1 = require("../definition");
const oauth_provider_abstract_1 = require("../oauth-provider.abstract");
class DiscordOauthProvider extends oauth_provider_abstract_1.OAuthProvider {
    constructor(credential) {
        super(credential);
        this.endpoints = {
            oauth2TokenUrl: "https://discord.com/api/oauth2/token",
            oauth2UserInfoUrl: "https://discord.com/api/v10/users/@me",
        };
    }
    verifyCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateInput(code);
            const tokenData = yield this.exchangeCodeToToken(code);
            const discordUserInfo = yield this.fetchUserInfo(tokenData.access_token);
            return {
                type: definition_1.OAuthProviderType.DISCORD,
                sub: discordUserInfo.id,
                name: discordUserInfo.username,
                email: discordUserInfo.email,
                pictureUrl: discordUserInfo.avatar
                    ? `https://cdn.discordapp.com/avatars/${discordUserInfo.id}/${discordUserInfo.avatar}`
                    : null,
            };
        });
    }
    exchangeCodeToToken(code) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield axios_1.default.post(this.endpoints.oauth2TokenUrl, {
                    client_id: this.credential.clientId,
                    redirect_uri: this.credential.redirectUri,
                    client_secret: this.credential.clientSecret,
                    code,
                    grant_type: "authorization_code",
                }, {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                });
                return response.data;
            }
            catch (error) {
                const errorMessage = ((_a = error.response.data) === null || _a === void 0 ? void 0 : _a.error_description) || error.message;
                throw new Error(`Failed to exchange code for token: ${errorMessage}`);
            }
        });
    }
    fetchUserInfo(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(this.endpoints.oauth2UserInfoUrl, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                return response.data;
            }
            catch (error) {
                throw new Error(`Failed to fetch user info: ${error.message}`);
            }
        });
    }
}
exports.DiscordOauthProvider = DiscordOauthProvider;
