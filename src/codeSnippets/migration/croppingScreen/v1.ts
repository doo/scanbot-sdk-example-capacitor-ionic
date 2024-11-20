import {CroppingConfiguration, Page, ScanbotSDK} from "capacitor-plugin-scanbot-sdk";


async function croppingScreen(page: Page) {
    const configuration: CroppingConfiguration = {
        doneButtonTitle: 'Apply',
        topBarBackgroundColor: '#ffffff',
        bottomBarBackgroundColor: '#ffffff',
    };

    const pageResult = await ScanbotSDK.startCroppingScreen({
        page: page,
        configuration: configuration,
    });
}
