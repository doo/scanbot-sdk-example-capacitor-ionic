import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'io.scanbot.example.sdk.capacitor',
    appName: 'Capacitor Scanbot SDK Example',
    webDir: 'www',
    server: {
        androidScheme: 'https',
    },
};

export default config;
