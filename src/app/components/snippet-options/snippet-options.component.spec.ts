import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { AuthResource } from '../../services/resources/auth.resource';
import { SnippetOptionsComponent } from './snippet-options.component';

describe('SnippetOptionsComponent', () => {
  let component: SnippetOptionsComponent;
  let fixture: ComponentFixture<SnippetOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SnippetOptionsComponent],
      imports: [HttpClientModule, NgxsModule.forRoot(), ToastrModule.forRoot({})],
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
