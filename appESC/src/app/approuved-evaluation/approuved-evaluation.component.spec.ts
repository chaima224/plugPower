import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprouvedEvaluationComponent } from './approuved-evaluation.component';

describe('ApprouvedEvaluationComponent', () => {
  let component: ApprouvedEvaluationComponent;
  let fixture: ComponentFixture<ApprouvedEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprouvedEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprouvedEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
