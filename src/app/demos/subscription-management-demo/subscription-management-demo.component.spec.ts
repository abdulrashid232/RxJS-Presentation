import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionManagementDemoComponent } from './subscription-management-demo.component';

describe('SubscriptionManagementDemoComponent', () => {
  let component: SubscriptionManagementDemoComponent;
  let fixture: ComponentFixture<SubscriptionManagementDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionManagementDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionManagementDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
