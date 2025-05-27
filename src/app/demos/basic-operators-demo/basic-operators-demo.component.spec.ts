import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicOperatorsDemoComponent } from './basic-operators-demo.component';

describe('BasicOperatorsDemoComponent', () => {
  let component: BasicOperatorsDemoComponent;
  let fixture: ComponentFixture<BasicOperatorsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicOperatorsDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicOperatorsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
