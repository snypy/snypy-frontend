import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { NgxResourceFactoryModule } from 'ngx-resource-factory';
import { ActiveFilterService } from '../../services/navigation/activeFilter.service';
import { LabelsComponent } from './labels.component';

describe('LabelsComponent', () => {
  let component: LabelsComponent;
  let fixture: ComponentFixture<LabelsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LabelsComponent],
      imports: [NgxsModule.forRoot(), NgxResourceFactoryModule.forRoot(), HttpClientModule],
      providers: [ActiveFilterService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
