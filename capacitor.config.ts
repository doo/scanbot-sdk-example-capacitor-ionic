import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.scanbot.example.sdk.capacitor',
  appName: 'Scanbot Example Sdk Capacitor',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
