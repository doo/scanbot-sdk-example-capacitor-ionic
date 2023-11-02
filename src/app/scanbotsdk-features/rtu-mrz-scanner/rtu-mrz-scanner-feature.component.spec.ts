import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtuMrzScannerFeature } from './rtu-mrz-scanner-feature.component';

describe('RtuMrzScannerFeature', () => {
    let component: RtuMrzScannerFeature;
    let fixture: ComponentFixture<RtuMrzScannerFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RtuMrzScannerFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(RtuMrzScannerFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
