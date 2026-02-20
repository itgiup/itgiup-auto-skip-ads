import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, Switch, InputNumber, Button, Space, Typography, Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { getMessage } from '../utils/i18n';
import { getSettings, saveSettings, ExtensionSettings } from '../utils/storage';
import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';

const { Title, Text } = Typography;

const Popup: React.FC = () => {
  const [settings, setSettings] = useState<ExtensionSettings>({
    enabled: true,
    skipDelay: 0,
    autoSkip: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

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

  const getLocale = () => {
    const lang = chrome.i18n.getUILanguage();
    return lang.startsWith('vi') ? viVN : enUS;
  };

  return (
    <ConfigProvider locale={getLocale()}>
      <div style={{ padding: '16px', width: '288px' }}>
        <Card size="small" style={{ marginBottom: '16px' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={4} style={{ margin: 0, textAlign: 'center' }}>
              <SettingOutlined /> {getMessage('settings')}
            </Title>
          </Space>
        </Card>

        <Card size="small" style={{ marginBottom: '16px' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text strong>{getMessage('enable')}</Text>
              <Switch
                checked={settings.enabled}
                onChange={(checked) => setSettings({ ...settings, enabled: checked })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text strong>{getMessage('autoSkip')}</Text>
              <Switch
                checked={settings.autoSkip}
                onChange={(checked) => setSettings({ ...settings, autoSkip: checked })}
                disabled={!settings.enabled}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text strong>{getMessage('skipDelay')}</Text>
              <InputNumber
                min={0}
                max={10}
                value={settings.skipDelay}
                onChange={(value) => setSettings({ ...settings, skipDelay: value || 0 })}
                disabled={!settings.enabled || !settings.autoSkip}
                style={{ width: '80px' }}
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
            {getMessage('save')}
          </Button>
          <Button
            onClick={loadSettings}
            style={{ width: '100px' }}
          >
            {getMessage('cancel')}
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
