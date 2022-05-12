import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {config} from 'dotenv';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';
import {SocialProviderTypes} from '../../user/user.entity';

config();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: 'http://localhost:3001/google/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ) {
        try {
            const {name, emails} = profile;
            const user = {
                provider: SocialProviderTypes.GOOGLE,
                email: emails[0].value,
                firstName: name.givenName,
                lastName: name.familyName,
                displayName: profile.displayName,
                accessToken,
            };

            console.log(user);
            done(null, user);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
