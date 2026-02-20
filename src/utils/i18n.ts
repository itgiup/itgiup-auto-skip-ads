export const getMessage = (key: string): string => {
  return chrome.i18n.getMessage(key) || key;
};

export const getLocale = (): string => {
  return chrome.i18n.getUILanguage();
};

export const formatMessage = (key: string, substitutions?: string | string[]): string => {
  return chrome.i18n.getMessage(key, substitutions) || key;
};
