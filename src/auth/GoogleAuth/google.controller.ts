import {Controller, Get, HttpStatus, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {SocialProviderTypes} from '../../user/user.entity';
import {UserService} from '../../user/user.service';

@Controller('google')
export class GoogleController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req): Promise<any> {
        return HttpStatus.OK;
    }

    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req) {
        const provider = req.user.provider;
        const displayName = req.user.displayName;
        const firstName = req.user.firstName;
        const lastName = req.user.lastName;
        const email = req.user.email;
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
            return {data: req.user, statusCode: HttpStatus.OK};
        } catch (error) {
            await this.userService.create({
                email: email,
                username: email,
                firstName: firstName,
                lastName: lastName,
                displayName: displayName,
                provider: SocialProviderTypes.GOOGLE,
                password: 'google',
                walletAddress: email,
            });
            return {data: req.user, statusCode: HttpStatus.OK};
        }
    }
}
