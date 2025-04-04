import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailService } from './mailer.service';

const MailerModuleInstance = MailerModule.forRoot({
  transport: {
    host: 'smtp.example.com', // Your SMTP server
    port: 587, // SMTP port
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'your-email@example.com', // Your email
      pass: 'your-email-password', // Your email password
    },
  },
  defaults: {
    from: '"No Reply" <no-reply@example.com>', // Default sender
  },
  template: {
    dir: __dirname + '/templates', // Directory for email templates
    adapter: new EjsAdapter(),
    options: {
      strict: true,
    },
  },
})

@Module({
  imports: [MailerModuleInstance],
  providers: [MailService],
  exports: [MailService],
})
export class MailerCustomModule {}