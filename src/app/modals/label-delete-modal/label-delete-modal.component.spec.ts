import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { LabelDeleteModalComponent } from './label-delete-modal.component';

describe('LabelDeleteModalComponent', () => {
  let component: LabelDeleteModalComponent;
  let fixture: ComponentFixture<LabelDeleteModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LabelDeleteModalComponent],
      imports: [NgbModule, ToastrModule.forRoot({}), HttpClientModule],
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
