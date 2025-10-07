import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { LabelDeleteModalComponent } from './label-delete-modal.component';

describe('LabelDeleteModalComponent', () => {
  let component: LabelDeleteModalComponent;
  let fixture: ComponentFixture<LabelDeleteModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LabelDeleteModalComponent],
      imports: [NgbModule, NoopAnimationsModule, ToastrModule.forRoot({}), HttpClientModule],
      providers: [NgbActiveModal],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelDeleteModalComponent);
    component = fixture.componentInstance;
    component.label = { name: 'test' } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
