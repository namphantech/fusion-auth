## FusionAuth SDK

### Overview

This library simplifies the process of integrating OAuth2.0 Authorization

### How ```FusionAuth-SDK``` works behind the scenes

![fusion-auth](docs/fusion-auth-flow.png)

### Installation

```bash
$ pnpm i fusion-auth
```

### Usages

#### Integrate with Google

```bash
import { OauthProviderFactory, OAuthProviderType, IOauthUserInfo } from 'fusion-auth';

const googleOauthConfig = {
  clientId: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  redirectUri: process.env.REDIRECT_URI || '',
};
const responseCode = ''

try {
  const googleProvider = OauthProviderFactory.createProvider(
    oauthConfig,
    OAuthProviderType.GOOGLE
  );

  const googleUserInfo:IOauthUserInfo =  await googleProvider.verifyCode(responseCode);
  console.log({googleUserInfo})

} catch (error) {
  throw error;
}
```

### Integrate with Facebook

```bash
import { OauthProviderFactory, OAuthProviderType, IOauthUserInfo } from 'fusion-auth';

const facebookOauthConfig = {
  clientId: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  redirectUri: process.env.REDIRECT_URI || '',
};
const responseCode = ''

 try {
    const facebookProvider = OauthProviderFactory.createProvider(
      oauthConfig,
      OAuthProviderType.FACEBOOK
    );
    const facebookUserInfo: IOauthUserInfo = await facebookProvider.verifyCode(
      responseCode
    );
    console.log({ facebookUserInfo });
  } catch (error) {
    throw error;
  }
```

## Contributing

Contributions are welcome! Please open a pull request if you have any enhancements for this library.

## Reference Documentation

[Facebook Client Docs](https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow/)

[Google Client Docs](https://developers.google.com/identity/protocols/oauth2)

## Contact

Mail: phanvanhoainam22@gmail.com

LinkedIn: https://www.linkedin.com/in/namphan-jasper/
