export interface TranslationDependencies {
  translations: { [key: string]: string | any };
}

export class Translation {
  constructor() {}

  translate(value: string, language: string) {
    const translation: any = [];
    return value.split(".").reduce((o, k) => {
      return o && o[k];
    }, translation);
  }
}
