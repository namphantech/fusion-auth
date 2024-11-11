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
exports.GoogleOauthProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const oauth_provider_abstract_1 = require("../oauth-provider.abstract");
class GoogleOauthProvider extends oauth_provider_abstract_1.OAuthProvider {
    constructor(credential) {
        super(credential);
        this.endpoints = {
            oauth2TokenUrl: "https://oauth2.googleapis.com/token",
            oauth2UserInfoUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
        };
    }
    verifyCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenData = yield this.exchangeCodeToToken(code);
                const userInfo = yield this.fetchUserInfo(tokenData.access_token);
                return {
                    email: userInfo.email,
                    sub: userInfo.sub,
                    picture: userInfo.picture,
                    username: userInfo.name,
                };
            }
            catch (error) {
                if (error.response) {
                    throw new Error(`OAuth error: ${error.response.data}`);
                }
                throw new Error(`OAuth error: ${error.message}`);
            }
        });
    }
    exchangeCodeToToken(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.post(this.endpoints.oauth2TokenUrl, Object.assign(Object.assign({}, this.credential), { code, grant_type: "authorization_code" }));
            return response.data;
        });
    }
    fetchUserInfo(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(this.endpoints.oauth2UserInfoUrl, {
                params: { access_token: accessToken },
            });
            return response.data;
        });
    }
}
exports.GoogleOauthProvider = GoogleOauthProvider;
