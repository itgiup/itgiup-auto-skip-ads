export const translations = {
  en: {
    extensionName: "Auto Skip Ads",
    settings: "Settings",
    enable: "Enable",
    disable: "Disable",
    autoSkip: "Auto Skip",
    skipDelay: "Skip Delay (seconds)",
    save: "Save",
    cancel: "Cancel",
    language: "Language",
    english: "English",
    vietnamese: "Vietnamese",
    chinese: "Chinese",
    russian: "Russian",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System"
  },
  vi: {
    extensionName: "Tự Động Bỏ Qua Quảng Cáo",
    settings: "Cài đặt",
    enable: "Bật",
    disable: "Tắt",
    autoSkip: "Tự Động Bỏ Qua",
    skipDelay: "Độ Trễ Bỏ Qua (giây)",
    save: "Lưu",
    cancel: "Hủy",
    language: "Ngôn ngữ",
    english: "Tiếng Anh",
    vietnamese: "Tiếng Việt",
    chinese: "Tiếng Trung",
    russian: "Tiếng Nga",
    theme: "Chủ đề",
    light: "Sáng",
    dark: "Tối",
    system: "Hệ thống"
  },
  zh: {
    extensionName: "自动跳过广告",
    settings: "设置",
    enable: "启用",
    disable: "禁用",
    autoSkip: "自动跳过",
    skipDelay: "跳过延迟（秒）",
    save: "保存",
    cancel: "取消",
    language: "语言",
    english: "英语",
    vietnamese: "越南语",
    chinese: "中文",
    russian: "俄语",
    theme: "主题",
    light: "浅色",
    dark: "深色",
    system: "系统"
  },
  ru: {
    extensionName: "Автоматический пропуск рекламы",
    settings: "Настройки",
    enable: "Включить",
    disable: "Отключить",
    autoSkip: "Автопропуск",
    skipDelay: "Задержка пропуска (секунды)",
    save: "Сохранить",
    cancel: "Отмена",
    language: "Язык",
    english: "Английский",
    vietnamese: "Вьетнамский",
    chinese: "Китайский",
    russian: "Русский",
    theme: "Тема",
    light: "Светлая",
    dark: "Тёмная",
    system: "Система"
  }
};

export type Language = 'en' | 'vi' | 'zh' | 'ru';

export const getTranslation = (language: Language, key: keyof typeof translations.en): string => {
  return translations[language][key] || translations.en[key] || key;
};
