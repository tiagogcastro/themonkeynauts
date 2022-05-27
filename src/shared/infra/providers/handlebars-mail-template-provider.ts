import fs from 'fs'
import { compile } from 'handlebars'
import { IMailTemplateProvider, ParseMailTemplateDTO } from '../../domain/providers/'

export class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  async parse({ file, variables }: ParseMailTemplateDTO): Promise<string> {
    const templateFileRead = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })

    const parseTemplate = compile(templateFileRead)

    return parseTemplate(variables)
  }
}

