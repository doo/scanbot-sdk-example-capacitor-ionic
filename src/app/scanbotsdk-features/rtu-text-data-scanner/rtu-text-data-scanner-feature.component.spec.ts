import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuTextDataScannerFeature } from './rtu-text-data-scanner-feature.component';

describe('RtuTextDataScannerFeature', () => {
    let component: RtuTextDataScannerFeature;
    let fixture: ComponentFixture<RtuTextDataScannerFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RtuTextDataScannerFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RtuTextDataScannerFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
