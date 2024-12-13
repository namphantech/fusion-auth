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
exports.GithubOauthProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const definition_1 = require("../definition");
const oauth_provider_abstract_1 = require("../oauth-provider.abstract");
class GithubOauthProvider extends oauth_provider_abstract_1.OAuthProvider {
    constructor(credential) {
        super(credential);
        this.endpoints = {
            oauth2TokenUrl: "https://github.com/login/oauth/access_token",
            oauth2UserInfoUrl: "https://api.github.com/user",
        };
    }
    verifyCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenData = yield this.exchangeCodeToToken(code);
                console.log({ tokenData });
                const response = yield axios_1.default.get(this.endpoints.oauth2UserInfoUrl, {
                    headers: {
                        Authorization: `Bearer ${tokenData.access_token}`,
                    },
                });
                const githubUserInfo = response.data;
                const githubUserEmail = yield this.fetchGithubUserEmail(tokenData.access_token);
                return {
                    type: definition_1.OAuthProviderType.GITHUB,
                    sub: githubUserInfo.id.toString(),
                    name: githubUserInfo.name,
                    email: githubUserEmail,
                    pictureUrl: githubUserInfo.avatar_url,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    exchangeCodeToToken(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.post(this.endpoints.oauth2TokenUrl, {
                client_id: this.credential.clientId,
                redirect_uri: this.credential.redirectUri,
                client_secret: this.credential.clientSecret,
                code,
            }, {
                headers: {
                    "Accept": "application/json",
                },
            });
            return response.data;
        });
    }
    fetchGithubUserEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield axios_1.default.get(`${this.endpoints.oauth2UserInfoUrl}/emails`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const githubUserEmail = (_a = response.data[0]) === null || _a === void 0 ? void 0 : _a.email;
            return githubUserEmail;
        });
    }
}
exports.GithubOauthProvider = GithubOauthProvider;
