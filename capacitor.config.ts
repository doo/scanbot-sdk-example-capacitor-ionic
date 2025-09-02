import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.scanbot.example.sdk.capacitor',
  appName: 'Capacitor Scanbot SDK Example',
  webDir: 'www',
  android: {
    adjustMarginsForEdgeToEdge: 'auto'
  },
  plugins: {
    StatusBar: {
      style: "DARK",
      backgroundColor: '#c8193c',
      overlaysWebView: false
    }
  }
};

export default config;
