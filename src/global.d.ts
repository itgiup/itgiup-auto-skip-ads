declare global {
  namespace chrome {
    namespace i18n {
      function getMessage(messageName: string, substitutions?: string | string[]): string;
      function getUILanguage(): string;
    }

    namespace storage {
      namespace sync {
        function get(keys?: string | string[] | Record<string, any> | null): Promise<Record<string, any>>;
        function set(items: Record<string, any>): Promise<void>;
      }
    }

    namespace runtime {
      const onMessage: {
        addListener(callback: (message: any, sender: any, sendResponse: any) => boolean | void): void;
      };
      const onInstalled: {
        addListener(callback: () => void): void;
      };
    }

    namespace tabs {
      const onUpdated: {
        addListener(callback: (tabId: number, changeInfo: any, tab: any) => void): void;
      };
      function sendMessage(tabId: number, message: any): void;
    }
  }
}

export {};
