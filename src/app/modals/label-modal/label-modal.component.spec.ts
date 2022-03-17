import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsModule } from '@ngxs/store';
import { NgxResourceFactoryModule } from 'ngx-resource-factory';
import { ToastrModule } from 'ngx-toastr';
import { LabelResource } from '../../services/resources/label.resource';
import { LabelModalComponent } from './label-modal.component';

describe('LabelModalComponent', () => {
  let component: LabelModalComponent;
  let fixture: ComponentFixture<LabelModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LabelModalComponent],
      imports: [
        NgbModule,
        NgxResourceFactoryModule.forRoot(),
        HttpClientModule,
        NgxsModule.forRoot(),
        ToastrModule.forRoot({}),
        NgxsSelectSnapshotModule.forRoot(),
      ],
      providers: [NgbActiveModal, LabelResource],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelModalComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'scope', { writable: true });
    component.scope = { area: 'team', value: {} as any };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
