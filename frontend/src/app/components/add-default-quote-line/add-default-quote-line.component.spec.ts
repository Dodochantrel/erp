import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefaultQuoteLineComponent } from './add-default-quote-line.component';

describe('AddDefaultQuoteLineComponent', () => {
  let component: AddDefaultQuoteLineComponent;
  let fixture: ComponentFixture<AddDefaultQuoteLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDefaultQuoteLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDefaultQuoteLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
