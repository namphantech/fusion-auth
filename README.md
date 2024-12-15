## FusionAuth SDK

This library simplifies OAuth2.0 Authorization for social login integration, allowing developers to easily authenticate users through popular social platforms like Google, Facebook, GitHub, Discord.

### How `FusionAuth-SDK` works behind the scenes

![fusion-auth](docs/fusion-auth-flow.png)

### Installation

```bash
$ pnpm i fusion-auth
```

### Usages

#### Integrate with Google

```bash
import { OauthProviderFactory, OAuthProviderType, IOauthUserInfo, IProviderCredential } from 'fusion-auth';

const googleOauthConfig: IProviderCredential = {
  clientId: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  redirectUri: process.env.REDIRECT_URI || '',
};
const responseCode = ''

try {
  const googleProvider = OauthProviderFactory.createProvider(
    googleOauthConfig,
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
import { OauthProviderFactory, OAuthProviderType, IOauthUserInfo, IProviderCredential } from 'fusion-auth';

const facebookOauthConfig: IProviderCredential = {
  clientId: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  redirectUri: process.env.REDIRECT_URI || '',
};
const responseCode = ''

 try {
    const facebookProvider: IProviderCredential= OauthProviderFactory.createProvider(
      facebookOauthConfig,
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

### Integrate with Github

```bash
import { OauthProviderFactory, OAuthProviderType, IOauthUserInfo, IProviderCredential } from 'fusion-auth';

const githubOauthConfig: IProviderCredential = {
  clientId: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  redirectUri: process.env.REDIRECT_URI || '',
};
const responseCode = ''

 try {
    const githubProvider = OauthProviderFactory.createProvider(
      oauthConfig,
      OAuthProviderType.GITHUB
    );
    const githubUserInfo: IOauthUserInfo = await githubProvider.verifyCode(
      responseCode
    );
    console.log({ githubUserInfo });
  } catch (error) {
    throw error;
  }
```

### Integrate with Discord
```bash
import { OauthProviderFactory, OAuthProviderType, IOauthUserInfo, IProviderCredential } from 'fusion-auth';

const discordOauthConfig: IProviderCredential = {
  clientId: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  redirectUri: process.env.REDIRECT_URI || '',
};
const responseCode = ''

 try {
    const discordProvider = OauthProviderFactory.createProvider(
      oauthConfig,
      OAuthProviderType.DISCORD
    );
    const discordUserInfo: IOauthUserInfo = await discordProvider.verifyCode(
      responseCode
    );
    console.log({ discordUserInfo });
  } catch (error) {
    throw error;
  }
```
## Contributing

Contributions are welcome! Please open a pull request if you have any enhancements for this library.

## Contact

Mail: phanvanhoainam22@gmail.com

LinkedIn: https://www.linkedin.com/in/namphan-jasper/
