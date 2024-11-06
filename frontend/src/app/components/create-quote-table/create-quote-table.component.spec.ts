import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuoteTableComponent } from './create-quote-table.component';

describe('CreateQuoteTableComponent', () => {
  let component: CreateQuoteTableComponent;
  let fixture: ComponentFixture<CreateQuoteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQuoteTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateQuoteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
