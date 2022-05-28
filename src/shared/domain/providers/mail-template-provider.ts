type Variables = {
  [key: string]: string | number;
};

type ParseMailTemplateDTO = {
  file: string;
  variables: Variables;
};

interface IMailTemplateProvider {
  parse(data: ParseMailTemplateDTO): Promise<string>;
}

export { IMailTemplateProvider, ParseMailTemplateDTO };
