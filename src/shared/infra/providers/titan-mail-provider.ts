import {
  IMailProvider,
  SendMailDTO,
} from '@shared/domain/providers/mail-provider';
import { IMailTemplateProvider } from '@shared/domain/providers/mail-template-provider';
import { createTransport, Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import { mailConfig } from '../../../config/mail';

@injectable()
export class TitanMailProvider implements IMailProvider {
  private transporter: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const transporter = createTransport({
      host: 'smtp.titan.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.TITAN_USER,
        pass: process.env.TITAN_PASS,
      },
    });

    this.transporter = transporter;
  }

  async sendMail({
    to,
    from,
    subject,
    template_data,
  }: SendMailDTO): Promise<void> {
    const { name, address } = mailConfig.config.titan.defaults.from;

    await this.transporter.sendMail({
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
  }
}
