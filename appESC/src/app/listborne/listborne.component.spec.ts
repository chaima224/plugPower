import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListborneComponent } from './listborne.component';

describe('ListborneComponent', () => {
  let component: ListborneComponent;
  let fixture: ComponentFixture<ListborneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListborneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListborneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
