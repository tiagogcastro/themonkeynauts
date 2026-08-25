import {
  IMailProvider,
  SendMailDTO,
} from '@shared/domain/providers/mail-provider';
import { inject, injectable } from 'tsyringe';
import { NodeMailgun } from 'ts-mailgun';
import { mailConfig } from '@config/mail';
import { IMailTemplateProvider } from '@shared/domain/providers/mail-template-provider';

@injectable()
export class MailgunMailProvider implements IMailProvider {
  private client: NodeMailgun;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const { domain } = mailConfig.config.mailgun;

    const apiKey = process.env.MAILGUN_API_KEY || '*';

    this.client = new NodeMailgun(apiKey, domain);
  }

  async sendMail({ to, subject, template_data }: SendMailDTO): Promise<void> {
    const { name, address } = mailConfig.config.mailgun.defaults.from;

    Object.assign(this.client, {
      fromEmail: address,
      fromTitle: name,
    });

    this.client.init();

    await this.client.send(
      to.address,
      subject,
      await this.mailTemplateProvider.parse(template_data),
    );
  }
}
