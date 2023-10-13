import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.scanbot.example.sdk.capacitor',
  appName: 'scanbot-example-sdk-capacitor',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
