import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonenComponent } from './personen.component';

describe('PersonenComponent', () => {
  let component: PersonenComponent;
  let fixture: ComponentFixture<PersonenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
