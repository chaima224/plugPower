import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprouvedBorneComponent } from './approuved-borne.component';

describe('ApprouvedBorneComponent', () => {
  let component: ApprouvedBorneComponent;
  let fixture: ComponentFixture<ApprouvedBorneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprouvedBorneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprouvedBorneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
