import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { NgxResourceFactoryModule } from 'ngx-resource-factory';
import { SnippetsComponent } from './snippets.component';

describe('SnippetsComponent', () => {
  let component: SnippetsComponent;
  let fixture: ComponentFixture<SnippetsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SnippetsComponent],
      imports: [NgxResourceFactoryModule.forRoot(), HttpClientModule, NgxsModule.forRoot()],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
