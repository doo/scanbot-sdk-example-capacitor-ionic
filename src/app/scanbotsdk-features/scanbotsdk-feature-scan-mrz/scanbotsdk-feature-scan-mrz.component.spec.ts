import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureScanMrzComponent } from './scanbotsdk-feature-scan-mrz.component';

describe('ScanbotsdkFeatureScanMrzComponent', () => {
    let component: ScanbotsdkFeatureScanMrzComponent;
    let fixture: ComponentFixture<ScanbotsdkFeatureScanMrzComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeatureScanMrzComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeatureScanMrzComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
