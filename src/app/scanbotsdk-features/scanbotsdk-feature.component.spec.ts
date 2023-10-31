import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from './scanbotsdk-feature.component';

describe('ScanbotsdkFeatureComponent', () => {
    let component: ScanbotSdkFeatureComponent;
    let fixture: ComponentFixture<ScanbotSdkFeatureComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotSdkFeatureComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotSdkFeatureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
