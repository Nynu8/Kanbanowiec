export interface TranslationDependencies {
  translations: { [key: string]: string | any };
}

export class Translation {
  constructor(private dependencies: TranslationDependencies) {}

  translate(value: string, language: string) {
    const { translations } = this.dependencies;
    const translation = translations[language] || translations[translations.defaultTranslation];
    return value.split(".").reduce((o, k) => {
      return o && o[k];
    }, translation);
  }
}
