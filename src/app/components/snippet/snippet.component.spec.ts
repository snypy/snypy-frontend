import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ApiModule } from '@snypy/rest-client';
import { SnippetComponent } from './snippet.component';

describe('SnippetComponent', () => {
  let component: SnippetComponent;
  let fixture: ComponentFixture<SnippetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SnippetComponent],
      imports: [HttpClientModule, NgxsModule.forRoot(), ApiModule],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the height for the editor', () => {
    expect(component.calculateEditorHeight('Test \n Test \n')).toBe('60px');
    expect(component.calculateEditorHeight('Test \n Test \n Test \n')).toBe('80px');
  });
});
