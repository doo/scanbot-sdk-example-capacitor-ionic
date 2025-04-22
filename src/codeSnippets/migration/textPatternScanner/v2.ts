import { AspectRatio, PatternContentValidator } from 'capacitor-plugin-scanbot-sdk';
import { TextPatternScannerScreenConfiguration, startTextPatternScanner } from 'capacitor-plugin-scanbot-sdk/ui_v2';

async function textPatternScanner() {
  const configiration = new TextPatternScannerScreenConfiguration();

  configiration.viewFinder.aspectRatio = new AspectRatio({
    height: 1.0,
    width: 5.0
  });

  configiration.finderViewUserGuidance.title.text = 'Place the text in the frame to scan it';

  configiration.scannerConfiguration.validator = new PatternContentValidator({
    patternGrammar: 'REGEX',
    pattern: '\\d+'
  });

  // Configure other parameters as needed.

  const result = await startTextPatternScanner(configiration);
}
