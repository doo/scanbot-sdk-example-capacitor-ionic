import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureScanGenericDocComponent } from './scanbotsdk-feature-scan-generic-doc.component';

describe('ScanbotsdkFeatureScanGenericDocComponent', () => {
    let component: ScanbotsdkFeatureScanGenericDocComponent;
    let fixture: ComponentFixture<ScanbotsdkFeatureScanGenericDocComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeatureScanGenericDocComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeatureScanGenericDocComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
