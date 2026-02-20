export interface ExtensionSettings {
  enabled: boolean;
  skipDelay: number;
  autoSkip: boolean;
  language: 'en' | 'vi' | 'zh' | 'ru';
  theme: 'light' | 'dark' | 'system';
}

export interface StorageData {
  settings: ExtensionSettings;
}
