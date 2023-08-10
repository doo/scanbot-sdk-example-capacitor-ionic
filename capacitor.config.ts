import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'scanbot-sdk-example-capacitor-native-ionic',
  webDir: 'www',
  bundledWebRuntime: false,
  ios: {
    contentInset: 'always',
  },
};

export default config;
