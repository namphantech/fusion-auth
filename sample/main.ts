import "dotenv/config";
import {
  OauthProviderFactory,
  OAuthProviderType,
  IOauthUserInfo,
} from "fusion-auth";

async function getGoogleUserInfo(
  responseCode: string
): Promise<IOauthUserInfo> {
  const oauthConfig = {
    clientId: process.env.CLIENT_ID || "",
    clientSecret: process.env.CLIENT_SECRET || "",
    redirectUri: process.env.REDIRECT_URI || "",
  };

  try {
    const googleProvider = OauthProviderFactory.createProvider(
      oauthConfig,
      OAuthProviderType.GOOGLE
    );
    const googleUserInfo: IOauthUserInfo = await googleProvider.verifyCode(
      responseCode
    );
    return googleUserInfo;
  } catch (error) {
    throw error;
  }
}

async function getFacebookUserInfo(
  responseCode: string
): Promise<IOauthUserInfo> {
  const oauthConfig = {
    clientId: process.env.CLIENT_ID || "",
    clientSecret: process.env.CLIENT_SECRET || "",
    redirectUri: process.env.REDIRECT_URI || "",
  };

  try {
    const facebookProvider = OauthProviderFactory.createProvider(
      oauthConfig,
      OAuthProviderType.FACEBOOK
    );
    const facebookUserInfo: IOauthUserInfo = await facebookProvider.verifyCode(
      responseCode
    );
    return facebookUserInfo;
  } catch (error) {
    throw error;
  }
}

async function integrateOauthWithGoogleProvider() {
  const responseCode = process.env.RESPONSE_CODE || "";
  const userInfo = await getGoogleUserInfo(responseCode);
  console.log({ userInfo });
}

async function integrateOauthWithFacebookProvider() {
  const responseCode = process.env.RESPONSE_CODE || "";
  const userInfo = await getFacebookUserInfo(responseCode);
  console.log({ userInfo });
}

(async () => {
  await integrateOauthWithFacebookProvider();
})();
