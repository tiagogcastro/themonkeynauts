import {
  IMailProvider,
  SendMailDTO,
} from '@shared/domain/providers/mail-provider';
import { IMailTemplateProvider } from '@shared/domain/providers/mail-template-provider';
import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
  Transporter,
} from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import { mailConfig } from '../../../config/mail';

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private transporter: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    createTestAccount().then(account => {
      const transporter = createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.transporter = transporter;
    });
  }

  async sendMail({
    to,
    from,
    subject,
    template_data,
  }: SendMailDTO): Promise<void> {
    const { name, address } = mailConfig.config.ethereal.defaults.from;

    const message = await this.transporter.sendMail({
      to: {
        name: to.name,
        address: to.address,
      },
      from: {
        name: from?.name || name,
        address: from?.address || address,
      },
      subject,
      html: await this.mailTemplateProvider.parse(template_data),
    });
    console.log(message.messageId);
    console.log(getTestMessageUrl(message));
  }
}
