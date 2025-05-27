import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsPresentationComponent } from './rxjs-presentation.component';

describe('RxjsPresentationComponent', () => {
  let component: RxjsPresentationComponent;
  let fixture: ComponentFixture<RxjsPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsPresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
