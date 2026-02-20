import { ExtensionSettings, StorageData } from './types';

export type { ExtensionSettings };

const DEFAULT_SETTINGS: ExtensionSettings = {
  enabled: true,
  skipDelay: 0,
  autoSkip: true,
  language: 'en'
};

export const getSettings = async (): Promise<ExtensionSettings> => {
  const result = await chrome.storage.sync.get('settings');
  return { ...DEFAULT_SETTINGS, ...result.settings };
};

export const saveSettings = async (settings: Partial<ExtensionSettings>): Promise<void> => {
  const currentSettings = await getSettings();
  const newSettings = { ...currentSettings, ...settings };
  await chrome.storage.sync.set({ settings: newSettings });
};

export const resetSettings = async (): Promise<void> => {
  await chrome.storage.sync.set({ settings: DEFAULT_SETTINGS });
};
