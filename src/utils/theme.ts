import { ExtensionSettings } from './types';
import { theme as antdTheme } from 'antd';

export const getSystemTheme = (): 'light' | 'dark' => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const getEffectiveTheme = (settings: ExtensionSettings): 'light' | 'dark' => {
  if (settings.theme === 'system') {
    return getSystemTheme();
  }
  return settings.theme;
};

export const getAntdTheme = (settings: ExtensionSettings) => {
  const effectiveTheme = getEffectiveTheme(settings);
  return {
    algorithm: effectiveTheme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  };
};

export const applyTheme = (settings: ExtensionSettings) => {
  const effectiveTheme = getEffectiveTheme(settings);
  const root = document.documentElement;
  
  if (effectiveTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    root.classList.add('dark');
    // CSS custom properties cho dark theme
    root.style.setProperty('--popup-bg', '#1f1f1f');
    root.style.setProperty('--popup-text', '#ffffff');
    root.style.setProperty('--card-bg', '#262626');
    root.style.setProperty('--card-border', '#434343');
  } else {
    root.setAttribute('data-theme', 'light');
    root.classList.remove('dark');
    // CSS custom properties cho light theme
    root.style.setProperty('--popup-bg', '#ffffff');
    root.style.setProperty('--popup-text', '#000000');
    root.style.setProperty('--card-bg', '#ffffff');
    root.style.setProperty('--card-border', '#d9d9d9');
  }
};
