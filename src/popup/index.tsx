import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, Switch, InputNumber, Button, Space, Typography, Card, Select, Radio } from 'antd';
import { SettingOutlined, BulbOutlined } from '@ant-design/icons';
import { getSettings, saveSettings, ExtensionSettings } from '../utils/storage';
import { getTranslation, Language } from '../utils/translations';
import { getAntdTheme, applyTheme, getEffectiveTheme } from '../utils/theme';
import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';
import zhCN from 'antd/locale/zh_CN';
import ruRU from 'antd/locale/ru_RU';

const { Title, Text } = Typography;
const { Option } = Select;

const Popup: React.FC = () => {
  const [settings, setSettings] = useState<ExtensionSettings>({
    enabled: true,
    skipDelay: 0,
    autoSkip: true,
    language: 'en',
    theme: 'system'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    applyTheme(settings);
  }, [settings.theme]);

  const loadSettings = async () => {
    try {
      const savedSettings = await getSettings();
      setSettings(savedSettings);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveSettings(settings);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const t = (key: string) => getTranslation(settings.language, key as any);

  const getAntdLocale = () => {
    switch (settings.language) {
      case 'vi': return viVN;
      case 'zh': return zhCN;
      case 'ru': return ruRU;
      default: return enUS;
    }
  };

  const getAntdThemeConfig = () => {
    return getAntdTheme(settings);
  };

  return (
    <ConfigProvider locale={getAntdLocale()} theme={getAntdThemeConfig()}>
      <div style={{
        padding: '16px',
        minHeight: '450px',
        backgroundColor: 'var(--popup-bg, #ffffff)',
        color: 'var(--popup-text, #000000)'
      }}>
        <Card size="small" style={{
          marginBottom: '16px',
          backgroundColor: 'var(--card-bg, #ffffff)',
          borderColor: 'var(--card-border, #d9d9d9)'
        }}>
          <Space direction="vertical" style={{ width: '100%', alignItems: 'center' }}>
            <Title level={4} style={{ margin: 0, textAlign: 'center' }}>
              <SettingOutlined /> {t('settings')}
            </Title>
          </Space>
        </Card>

        <Card size="small" style={{
          marginBottom: '16px',
          backgroundColor: 'var(--card-bg, #ffffff)',
          borderColor: 'var(--card-border, #d9d9d9)'
        }}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Text strong style={{ flex: 1 }}>🌍 {t('language')}</Text>
              <Select
                value={settings.language}
                onChange={(value: Language) => setSettings({ ...settings, language: value })}
                style={{ width: '120px', flexShrink: 0 }}
                size="small"
              >
                <Option value="en">English</Option>
                <Option value="vi">Tiếng Việt</Option>
                <Option value="zh">中文</Option>
                <Option value="ru">Русский</Option>
              </Select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Text strong style={{ flex: 1 }}><BulbOutlined /> {t('theme')}</Text>
              <Radio.Group
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                size="small"
                style={{ flexShrink: 0 }}
              >
                <Radio.Button value="light">{t('light')}</Radio.Button>
                <Radio.Button value="dark">{t('dark')}</Radio.Button>
                <Radio.Button value="system">{t('system')}</Radio.Button>
              </Radio.Group>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Text strong style={{ flex: 1 }}>{t('enable')}</Text>
              <Switch
                checked={settings.enabled}
                onChange={(checked) => setSettings({ ...settings, enabled: checked })}
                style={{ flexShrink: 0 }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Text strong style={{ flex: 1 }}>{t('autoSkip')}</Text>
              <Switch
                checked={settings.autoSkip}
                onChange={(checked) => setSettings({ ...settings, autoSkip: checked })}
                disabled={!settings.enabled}
                style={{ flexShrink: 0 }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Text strong style={{ flex: 1 }}>{t('skipDelay')}</Text>
              <InputNumber
                min={0}
                max={10}
                value={settings.skipDelay}
                onChange={(value) => setSettings({ ...settings, skipDelay: value || 0 })}
                disabled={!settings.enabled || !settings.autoSkip}
                style={{ width: '80px', flexShrink: 0 }}
                size="small"
              />
            </div>
          </Space>
        </Card>

        <Space style={{ width: '100%', justifyContent: 'center' }}>
          <Button
            type="primary"
            onClick={handleSave}
            loading={loading}
            style={{ width: '100px' }}
          >
            {t('save')}
          </Button>
          <Button
            onClick={loadSettings}
            style={{ width: '100px' }}
          >
            {t('cancel')}
          </Button>
        </Space>
      </div>
    </ConfigProvider>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Popup />);
}
