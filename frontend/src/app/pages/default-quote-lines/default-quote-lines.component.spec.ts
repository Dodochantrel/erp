import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuoteLinesComponent } from './default-quote-lines.component';

describe('EditQuoteLinesComponent', () => {
  let component: EditQuoteLinesComponent;
  let fixture: ComponentFixture<EditQuoteLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditQuoteLinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditQuoteLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
