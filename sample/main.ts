import "dotenv/config";
import {
  OauthProviderFactory,
  OAuthProviderType,
  IOauthUserInfo,
} from "fusion-auth";

const oauthConfig = {
  clientId: process.env.CLIENT_ID || "",
  clientSecret: process.env.CLIENT_SECRET || "",
  redirectUri: process.env.REDIRECT_URI || "",
};

async function getUserInfo(
  responseCode: string,
  providerType: OAuthProviderType
): Promise<IOauthUserInfo> {
  const provider = OauthProviderFactory.createProvider(
    oauthConfig,
    providerType
  );
  return await provider.verifyCode(responseCode);
}

async function run(providerType: OAuthProviderType) {
  const responseCode = process.env.RESPONSE_CODE || "";
  if (!responseCode) {
    console.error("RESPONSE_CODE is not set in environment variables.");
    return;
  }
  console.log(`Starting integration with provider: ${providerType}`);
  try {
    const userInfo = await getUserInfo(responseCode, providerType);
    console.log({ providerType, userInfo });
  } catch (error) {
    throw error;
  }
}

(async () => {
  const provideType = OAuthProviderType.DISCORD;
  await run(provideType);
})();
