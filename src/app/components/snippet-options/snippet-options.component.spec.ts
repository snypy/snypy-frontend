import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { NgxResourceFactoryModule } from 'ngx-resource-factory';
import { AuthResource } from '../../services/resources/auth.resource';
import { SnippetResource } from '../../services/resources/snippet.resource';
import { SnippetLabelResource } from '../../services/resources/snippetlabel.resource';
import { UserResource } from '../../services/resources/user.resource';
import { SnippetOptionsComponent } from './snippet-options.component';

describe('SnippetOptionsComponent', () => {
  let component: SnippetOptionsComponent;
  let fixture: ComponentFixture<SnippetOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SnippetOptionsComponent],
      imports: [NgxResourceFactoryModule.forRoot(), HttpClientModule, NgxsModule.forRoot()],
      providers: [
        SnippetLabelResource,
        AuthResource,
        UserResource,
        SnippetResource,
        { provide: Window, useValue: { location: { host: 'localhost', protocol: 'http' } } },
      ],
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
