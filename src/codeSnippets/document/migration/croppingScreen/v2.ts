import { CroppingStandaloneConfiguration, ScanbotDocument } from 'capacitor-plugin-scanbot-sdk';

async function croppingScreen(documentUuid: string, pageUuid: string) {
  const configuration = new CroppingStandaloneConfiguration({
    documentUuid: documentUuid,
    pageUuid: pageUuid,
  });
  // Equivalent to topBarBackgroundColor & bottomBarBackgroundColor: '#ffffff'
  configuration.palette.sbColorPrimary = '#ffffff';
  // Equivalent to doneButtonTitle: 'Apply',
  configuration.localization.croppingTopBarConfirmButtonTitle = 'Apply';

  const documentData = await ScanbotDocument.startCroppingScreen(configuration);
}
