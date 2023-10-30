import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuLicensePlateScannerFeature } from './rtu-license-plate-scanner-feature.component';

describe('RtuLicensePlateScannerFeature', () => {
    let component: RtuLicensePlateScannerFeature;
    let fixture: ComponentFixture<RtuLicensePlateScannerFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RtuLicensePlateScannerFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RtuLicensePlateScannerFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
