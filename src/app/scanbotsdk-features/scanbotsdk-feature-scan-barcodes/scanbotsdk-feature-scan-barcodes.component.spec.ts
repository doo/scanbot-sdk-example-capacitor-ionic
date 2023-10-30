import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureScanBarcodesComponent } from './scanbotsdk-feature-scan-barcodes.component';

describe('ScanbotsdkFeatureScanBarcodesComponent', () => {
    let component: ScanbotsdkFeatureScanBarcodesComponent;
    let fixture: ComponentFixture<ScanbotsdkFeatureScanBarcodesComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeatureScanBarcodesComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeatureScanBarcodesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
