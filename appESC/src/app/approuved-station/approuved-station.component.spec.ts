import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprouvedStationComponent } from './approuved-station.component';

describe('ApprouvedStationComponent', () => {
  let component: ApprouvedStationComponent;
  let fixture: ComponentFixture<ApprouvedStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprouvedStationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprouvedStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
