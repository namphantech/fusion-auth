export interface IExchangeToFacebookToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface IFacebookOauthUserApiResponse {
  id: string;
  email: string;
  name: string;
  picture: IFacebookProfilePicture;
}

export interface IFacebookProfilePicture {
  data: {
    height: number;
    is_silhouette: boolean;
    url: string;
    width: number;
  };
}
