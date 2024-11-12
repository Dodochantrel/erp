import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuotePriceComponent } from './create-quote-price.component';

describe('CreateQuotePriceComponent', () => {
  let component: CreateQuotePriceComponent;
  let fixture: ComponentFixture<CreateQuotePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQuotePriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateQuotePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
