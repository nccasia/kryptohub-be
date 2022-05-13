import {AuthProvider} from '..';

export interface UserGithub {
    user: UserReq;
    accessToken: string
}

export interface UserReq {
    id: string;

    provider: AuthProvider;

    providerId: string;

    displayName: string;

    username: string;

    photos: {
        value: string; 
    }[];
}
