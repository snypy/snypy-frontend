import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ActiveFilterService } from '../../services/navigation/activeFilter.service';
import { AuthResource } from '../../services/resources/auth.resource';
import { BaseComponent } from './base.component';

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BaseComponent],
      imports: [NgxsModule.forRoot(), HttpClientModule, ToastrModule.forRoot({})],
      providers: [
        AuthResource,
        ActiveFilterService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: { scope: 'user' } },
            params: {
              pipe: () => {
                return new Observable();
              },
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
