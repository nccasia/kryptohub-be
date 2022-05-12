import {Test, TestingModule} from '@nestjs/testing';
import {GoogleController} from './google.controller';

describe('Google Controller', () => {
    let googleController: GoogleController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [GoogleController],
            providers: [],
        }).compile();

        googleController = app.get<GoogleController>(GoogleController);
    });

    describe('GET /google', () => {
        it('Should return void', () => {
            const result = googleController.googleAuth;
            expect(result).toBeUndefined();
        });
    });
});
