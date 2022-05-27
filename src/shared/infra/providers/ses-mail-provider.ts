import aws from 'aws-sdk';
import { createTransport, Transporter } from 'nodemailer';
import { mailConfig } from '../../../config/mail';
import { IMailProvider, SendMailDTO } from '../IMailProvider';
import { IMailTemplateProvider } from '../IMailTemplateProvider';

export default class SESMailProvider implements IMailProvider {
  private transporter: Transporter
  constructor(
    private mailTemplateProvider: IMailTemplateProvider
  ){
    const transporter = createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1'
      })
    })

    this.transporter = transporter
  }
  async sendMail({
    to,
    from,
    subject,
    templateData
  }: SendMailDTO): Promise<void> {
    const { name, address } = mailConfig.config.ses.defaults.from
    
    this.transporter.sendMail({
      from: {
        address: from?.address || address,
        name: from?.name || name
      },
      to: {
        name: to.name,
        address: to.address
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    })
  }

}