import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureScanCheckComponent } from './scanbotsdk-feature-scan-check.component';

describe('ScanbotsdkFeatureScanCheckComponent', () => {
    let component: ScanbotsdkFeatureScanCheckComponent;
    let fixture: ComponentFixture<ScanbotsdkFeatureScanCheckComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeatureScanCheckComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeatureScanCheckComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
