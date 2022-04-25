import {NestFactory} from '@nestjs/core';
import compression from 'compression';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(compression());
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
