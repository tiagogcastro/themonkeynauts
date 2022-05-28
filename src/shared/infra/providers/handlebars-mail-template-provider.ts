import {
  IMailTemplateProvider,
  ParseMailTemplateDTO,
} from '@shared/domain/providers/mail-template-provider';
import fs from 'node:fs';
import { compile } from 'handlebars';

export class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  async parse({ file, variables }: ParseMailTemplateDTO): Promise<string> {
    const templateFileRead = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = compile(templateFileRead);

    return parseTemplate(variables);
  }
}
