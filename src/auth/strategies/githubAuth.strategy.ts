import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Profile, Strategy} from 'passport-github2';

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(
    ) {
        super({
            clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
            clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_OAUTH_CALLBACK_URL,
            scope: ['public_profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<any> {
        const {profileUrl, displayName, username, photos} = profile;
        const user = {
            photos: photos[0].value,
            profileUrl,
            displayName,
            username,
        };
        const payload = {user, accessToken};
        return done(null, payload);
    }
}
