import {NestFactory} from '@nestjs/core';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import {SerializeInterceptor, ValidationPipe} from '@hovoh/nestjs-api-lib';
import {ApplicationErrorsFilter} from '@hovoh/nestjs-application-error';
import {errors} from '@hovoh/nestjs-authentication-lib';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(compression());
    app.use(cookieParser());
    app.useGlobalInterceptors(new SerializeInterceptor() as any);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(
        new ApplicationErrorsFilter(errors.authErrorStatusMap),
    );

    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
