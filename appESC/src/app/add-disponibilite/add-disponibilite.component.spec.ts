import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDisponibiliteComponent } from './add-disponibilite.component';

describe('AddDisponibiliteComponent', () => {
  let component: AddDisponibiliteComponent;
  let fixture: ComponentFixture<AddDisponibiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDisponibiliteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDisponibiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
