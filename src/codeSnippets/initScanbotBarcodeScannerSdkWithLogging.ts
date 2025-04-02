import { ScanbotSDK, ScanbotSdkConfiguration } from "capacitor-plugin-scanbot-sdk";

async function initScanbotDocumentScannerSdkWithLogging() {
    const config: ScanbotSdkConfiguration = {
        licenseKey: '',
        loggingEnabled: true,
    };

    try {
        const initResult = await ScanbotSDK.initializeSDK(config);
        console.log(initResult.result);
    } catch (error: any) {
        console.error(error);
    }
}