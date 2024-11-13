import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuoteInformationComponent } from './create-quote-information.component';

describe('CreateQuoteInformationComponent', () => {
  let component: CreateQuoteInformationComponent;
  let fixture: ComponentFixture<CreateQuoteInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQuoteInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateQuoteInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
