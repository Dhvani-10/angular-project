import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParticipantsComponent } from './view-participants.component';

describe('ViewParticipantsComponent', () => {
  let component: ViewParticipantsComponent;
  let fixture: ComponentFixture<ViewParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewParticipantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
