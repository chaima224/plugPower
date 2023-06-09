import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheSearchComponent } from './affiche-search.component';

describe('AfficheSearchComponent', () => {
  let component: AfficheSearchComponent;
  let fixture: ComponentFixture<AfficheSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficheSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficheSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
