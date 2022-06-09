import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService implements MailerOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMailerOptions():MailerOptions {
    return {
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: this.configService.get('MAIL_USER'),
          pass: this.configService.get('MAIL_PASSWORD')
        },
      },
      defaults: {
        from: `"Kryptohub" <${this.configService.get('MAIL_USER')}>`,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }
  }
}
