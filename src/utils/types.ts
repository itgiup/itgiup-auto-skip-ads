export interface ExtensionSettings {
  enabled: boolean;
  skipDelay: number;
  autoSkip: boolean;
}

export interface StorageData {
  settings: ExtensionSettings;
}
