import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

async function textPatternScanner() {
  const configuration: TextDataScannerConfiguration = {
    textDataScannerStep: {
      aspectRatio: {
        height: 1.0,
        width: 5.0,
      },
      guidanceText: 'Place the text in the frame to scan it',
    },
    textDataValueFilter: '\\d+'
    // Other UI configs...
  };

  const result = await ScanbotSDK.startTextDataScanner(configuration);
}
