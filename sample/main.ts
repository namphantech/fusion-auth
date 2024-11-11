import 'dotenv/config';
import { OauthProviderFactory, OauthSocialProvider } from 'fusion-auth';

async function getGoogleUserInfo(responseCode: string) {
    const oauthConfig = {
        clientId: process.env.CLIENT_ID || '',
        clientSecret: process.env.CLIENT_SECRET || '',
        redirectUri: process.env.REDIRECT_URI || '',
    };

    try {
        const googleProvider = OauthProviderFactory.createProvider(
            oauthConfig,
            OauthSocialProvider.GOOGLE
        );
        return await googleProvider.verifyCode(responseCode);
    } catch (error) {
        throw error;
    }
}

async function integrateOauthWithGoogleProvider() {
    const responseCode = process.env.RESPONSE_CODE || '';
    const userInfo = await getGoogleUserInfo(responseCode);
    console.log({ userInfo });
}

(async () => {
    await integrateOauthWithGoogleProvider();
})();
