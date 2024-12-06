import {CroppingConfiguration, startCroppingScreen} from "capacitor-plugin-scanbot-sdk/ui_v2";

async function croppingScreen(documentID: string, pageID: string) {
    const configuration = new CroppingConfiguration({
        documentUuid: documentID,
        pageUuid: pageID,
    });
    // Equivalent to topBarBackgroundColor & bottomBarBackgroundColor: '#ffffff'
    configuration.palette.sbColorPrimary = '#ffffff';
    // Equivalent to doneButtonTitle: 'Apply',
    configuration.localization.croppingTopBarConfirmButtonTitle = 'Apply';

    const documentData = await startCroppingScreen(configuration);
}
