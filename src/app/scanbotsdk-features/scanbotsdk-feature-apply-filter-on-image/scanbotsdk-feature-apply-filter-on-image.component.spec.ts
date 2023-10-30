import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanbotsdkFeatureApplyFilterOnImageComponent } from './scanbotsdk-feature-apply-filter-on-image.component';

describe('ScanbotsdkFeatureApplyFilterOnImageComponent', () => {
    let component: ScanbotsdkFeatureApplyFilterOnImageComponent;
    let fixture: ComponentFixture<ScanbotsdkFeatureApplyFilterOnImageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ScanbotsdkFeatureApplyFilterOnImageComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ScanbotsdkFeatureApplyFilterOnImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
