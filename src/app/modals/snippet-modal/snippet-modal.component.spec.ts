import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsModule } from '@ngxs/store';
import { NgxResourceFactoryModule } from 'ngx-resource-factory';
import { ToastrModule } from 'ngx-toastr';
import { SnippetResource } from '../../services/resources/snippet.resource';
import { SnippetModalComponent } from './snippet-modal.component';

describe('SnippetModalComponent', () => {
  let component: SnippetModalComponent;
  let fixture: ComponentFixture<SnippetModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SnippetModalComponent],
      imports: [
        NgxsModule.forRoot(),
        NgxResourceFactoryModule.forRoot(),
        HttpClientModule,
        ToastrModule.forRoot({}),
        NgxsSelectSnapshotModule.forRoot(),
      ],
      providers: [NgbActiveModal, SnippetResource],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetModalComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'scope', { writable: true });
    component.scope = { area: 'team', value: {} as any };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
