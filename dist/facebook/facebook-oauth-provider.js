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
exports.FacebookOauthProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const definition_1 = require("../definition");
const oauth_provider_abstract_1 = require("../oauth-provider.abstract");
class FacebookOauthProvider extends oauth_provider_abstract_1.OAuthProvider {
    constructor(credential) {
        super(credential);
        this.endpoints = {
            oauth2TokenUrl: "https://graph.facebook.com/v21.0/oauth/access_token",
            oauth2UserInfoUrl: "https://graph.facebook.com/me",
        };
    }
    verifyCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            yield this.validateInput(code);
            const tokenData = yield this.exchangeCodeToToken(code);
            const facebookUserInfo = yield this.fetchUserInfo(tokenData.access_token);
            return {
                type: definition_1.OAuthProviderType.FACEBOOK,
                sub: facebookUserInfo.id,
                name: facebookUserInfo.name,
                email: facebookUserInfo.email,
                pictureUrl: ((_b = (_a = facebookUserInfo === null || facebookUserInfo === void 0 ? void 0 : facebookUserInfo.picture) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.url) || null,
            };
        });
    }
    exchangeCodeToToken(code) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield axios_1.default.get(this.endpoints.oauth2TokenUrl, {
                    params: {
                        client_id: this.credential.clientId,
                        redirect_uri: this.credential.redirectUri,
                        client_secret: this.credential.clientSecret,
                        code,
                    },
                });
                return response.data;
            }
            catch (error) {
                const errorMessage = ((_a = error.response.data.error) === null || _a === void 0 ? void 0 : _a.message) || definition_1.defaultErrorMessage;
                throw new Error(`Failed to exchange code for token: ${errorMessage}`);
            }
        });
    }
    fetchUserInfo(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(this.endpoints.oauth2UserInfoUrl, {
                    params: {
                        access_token: accessToken,
                        fields: "id,name,email,picture.width(200).height(200)",
                    },
                });
                return response.data;
            }
            catch (error) {
                const errorMessage = error.response.data.error.message || definition_1.defaultErrorMessage;
                throw new Error(`Failed to fetch user info: ${errorMessage}`);
            }
        });
    }
}
exports.FacebookOauthProvider = FacebookOauthProvider;
