import handlebars from 'handlebars';
import { IMailTemplateDTO } from '../dto/IMailTemplateDTO';
import { IMailTemplate } from '../IMailTemplate';

//TODO: Adicionar injeção de dependência
export class HandlebarsMailTemplate implements IMailTemplate {
  parse({ template, variables }: IMailTemplateDTO): string {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
