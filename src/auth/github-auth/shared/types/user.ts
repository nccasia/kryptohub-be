import {AuthProvider} from '..';
import {GoogleProvider} from './auth';

export interface UserGithub {
    user: UserReq;
    accessToken: string;
}

export interface UserGoogleReq {
    provider: GoogleProvider;

    displayName: string;

    email: string;

    firstName: string;

    lastName: string;

    accessToken: string;
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
