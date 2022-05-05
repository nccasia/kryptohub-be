import { INestApplication, ValidationPipe } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

export function setupValidation(app: INestApplication): INestApplication {
    
    app.useGlobalPipes(new ValidationPipe());

    return app;
}
