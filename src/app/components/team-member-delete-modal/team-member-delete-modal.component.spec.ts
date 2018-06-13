import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberDeleteModalComponent } from './team-member-delete-modal.component';

describe('TeamMemberDeleteModalComponent', () => {
  let component: TeamMemberDeleteModalComponent;
  let fixture: ComponentFixture<TeamMemberDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMemberDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
