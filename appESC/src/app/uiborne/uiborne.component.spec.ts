import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UIBorneComponent } from './uiborne.component';

describe('UIBorneComponent', () => {
  let component: UIBorneComponent;
  let fixture: ComponentFixture<UIBorneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UIBorneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UIBorneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
