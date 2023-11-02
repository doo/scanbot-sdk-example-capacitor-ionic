import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApplyFilterOnImageFeature } from './apply-filter-on-image-feature.component';

describe('ApplyFilterOnImageFeature', () => {
    let component: ApplyFilterOnImageFeature;
    let fixture: ComponentFixture<ApplyFilterOnImageFeature>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ApplyFilterOnImageFeature],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ApplyFilterOnImageFeature);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
