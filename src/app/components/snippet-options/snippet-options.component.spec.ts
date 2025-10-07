import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { ALL_STATES } from '../../testing/ngxs-test-helper';
import { AuthResource } from '../../services/resources/auth.resource';
import { SnippetOptionsComponent } from './snippet-options.component';

describe('SnippetOptionsComponent', () => {
  let component: SnippetOptionsComponent;
  let fixture: ComponentFixture<SnippetOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SnippetOptionsComponent],
      imports: [HttpClientModule, NoopAnimationsModule, NgxsModule.forRoot(ALL_STATES), ToastrModule.forRoot({})],
      providers: [AuthResource, { provide: Window, useValue: { location: { host: 'localhost', protocol: 'http' } } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
