import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputDemoComponent } from './search-input-demo.component';

describe('SearchInputDemoComponent', () => {
  let component: SearchInputDemoComponent;
  let fixture: ComponentFixture<SearchInputDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInputDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
