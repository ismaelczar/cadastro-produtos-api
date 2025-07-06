import { IMailTemplateDTO } from './dto/IMailTemplateDTO';

export abstract class IMailTemplate {
  abstract parse(data: IMailTemplateDTO): string;
}
