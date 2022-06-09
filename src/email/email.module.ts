import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: EmailService
    })
  ],
  providers: [EmailService]
})
export class EmailModule {
  constructor(){
    console.log(__dirname + '/templates')
  }
}
