import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsModule } from '@ngxs/store';
import { ActiveFilterService } from '../../services/navigation/activeFilter.service';
import { ServicesModule } from '../../services/services.module';
import { LanguagesComponent } from './languages.component';

describe('LanguagesComponent', () => {
  let component: LanguagesComponent;
  let fixture: ComponentFixture<LanguagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LanguagesComponent],
      imports: [ServicesModule, NgxsModule.forRoot(), NgxsSelectSnapshotModule.forRoot()],
      providers: [ActiveFilterService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
