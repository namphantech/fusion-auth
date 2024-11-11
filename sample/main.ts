
import { OauthProviderFactory, OauthSocialProvider } from "fusion-auth"
async function testOauthWithGoogle() {
  const userInfo = await OauthProviderFactory.createProvider(
    {
      clientId:
        "your app clientId",
      clientSecret: "your app clientSecret",
      redirectUri: "your app redirectUri",
    },
    OauthSocialProvider.GOOGLE
  ).verifyCode(
    "responseCode"
  );

  console.log({ userInfo });

}

(async () => {
  await testOauthWithGoogle();
})();
