import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureScanTextDataComponent } from './scanbotsdk-feature-scan-text-data.component';

describe('ScanbotsdkFeatureScanTextDataComponent', () => {
    let component: ScanbotsdkFeatureScanTextDataComponent;
    let fixture: ComponentFixture<ScanbotsdkFeatureScanTextDataComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeatureScanTextDataComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeatureScanTextDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
