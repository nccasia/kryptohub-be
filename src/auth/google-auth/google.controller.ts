import {HttpService} from '@nestjs/axios';
import {Controller, Get, HttpStatus, Req, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {firstValueFrom} from 'rxjs';
import {SocialProviderTypes} from '../../user/user.entity';
import {UserService} from '../../user/user.service';
import {JwtAuthService} from '../github-auth/jwt/jwt-auth.service';
import {Request, Response} from 'express';
import {UserGoogleReq} from '../github-auth/shared';
@Controller('google')
export class GoogleController {
    constructor(
        private readonly userService: UserService,
        private readonly http: HttpService,
        private readonly jwtAuthService: JwtAuthService,
    ) {}

    @Get('')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req): Promise<any> {
        return HttpStatus.OK;
    }

    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(
        @Req() req: Request,
        @Res({passthrough: true}) res: Response,
    ) {
        const user = req.user as UserGoogleReq;
        const provider = user.provider;
        const displayName = user.displayName;
        const firstName = user.firstName;
        const lastName = user.lastName;
        const email = user.email;

        const getUser = await firstValueFrom(
            this.http
                .get('https://accounts.google.com/o/oauth2/v2/auth', {
                    headers: {Authorization: `Bearer ${user.accessToken}`},
                })
                .pipe((res) => res),
        );
        const userGoogle = getUser.data;
        try {
            await this.userService.findOne({
                where: {
                    email,
                    provider,
                    firstName,
                    lastName,
                    displayName,
                },
            });
            const {accessToken} = this.jwtAuthService.loginGooge(user);
            res.cookie('jwt', accessToken);
            return {accessToken: accessToken};
        } catch (error) {
            await this.userService.create({
                email: email,
                username: email,
                firstName: firstName,
                lastName: lastName,
                displayName: displayName,
                provider: SocialProviderTypes.GOOGLE,
                password: 'google',
            });
            const {accessToken} = this.jwtAuthService.loginGooge(user);
            res.cookie('jwt', accessToken);
            return {accessToken: accessToken};
        }
    }
}
