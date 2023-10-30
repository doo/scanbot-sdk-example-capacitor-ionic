import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureScanBatchBarcodesComponent } from './scanbotsdk-feature-scan-batch-barcodes.component';

describe('ScanbotsdkFeatureScanBatchBarcodesComponent', () => {
    let component: ScanbotsdkFeatureScanBatchBarcodesComponent;
    let fixture: ComponentFixture<ScanbotsdkFeatureScanBatchBarcodesComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeatureScanBatchBarcodesComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeatureScanBatchBarcodesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
