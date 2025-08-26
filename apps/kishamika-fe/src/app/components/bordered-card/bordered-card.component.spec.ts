import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderedCardComponent } from './bordered-card.component';

describe('BorderedCardComponent', () => {
  let component: BorderedCardComponent;
  let fixture: ComponentFixture<BorderedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorderedCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorderedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
