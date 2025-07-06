export interface IMailTemplateDTO {
  template: string;
  variables: { [key: string]: string | number };
}
