import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWithNavigationComponent } from './view-with-navigation.component';

describe('ViewWithNavigationComponent', () => {
  let component: ViewWithNavigationComponent;
  let fixture: ComponentFixture<ViewWithNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewWithNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewWithNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
