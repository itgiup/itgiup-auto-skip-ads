export interface ExtensionSettings {
  enabled: boolean;
  skipDelay: number;
  autoSkip: boolean;
  language: 'en' | 'vi' | 'zh' | 'ru';
}

export interface StorageData {
  settings: ExtensionSettings;
}
