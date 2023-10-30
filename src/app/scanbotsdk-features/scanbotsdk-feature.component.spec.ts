import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureComponent } from './scanbotsdk-feature.component';

describe('ScanbotsdkFeatureComponent', () => {
    let component: ScanbotsdkFeatureComponent;
    let fixture: ComponentFixture<ScanbotsdkFeatureComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeatureComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeatureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});