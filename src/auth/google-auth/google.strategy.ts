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
            callbackURL: process.env.GOOGLE_CALL_BACK_URL,
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
            done(null, user);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
