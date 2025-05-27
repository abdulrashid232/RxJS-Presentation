import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchmapSearchDemoComponent } from './switchmap-search-demo.component';

describe('SwitchmapSearchDemoComponent', () => {
  let component: SwitchmapSearchDemoComponent;
  let fixture: ComponentFixture<SwitchmapSearchDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchmapSearchDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchmapSearchDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
