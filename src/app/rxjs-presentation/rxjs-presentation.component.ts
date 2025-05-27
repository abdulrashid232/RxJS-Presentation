import { Component } from '@angular/core';

import { BasicOperatorsDemoComponent } from '../demos/basic-operators-demo/basic-operators-demo.component';
import { SearchInputDemoComponent } from '../demos/search-input-demo/search-input-demo.component';
import { SwitchmapSearchDemoComponent } from '../demos/switchmap-search-demo/switchmap-search-demo.component';
import { SubscriptionManagementDemoComponent } from '../demos/subscription-management-demo/subscription-management-demo.component';
import { content } from '../data/content';

interface Slide {
  title: string;
  content?: string[];
  code?: string;
  demoComponent?: string;
  phase?: string;
  goal?: string;
  showCodeExample?: boolean;
}

@Component({
  selector: 'app-rxjs-presentation',
  imports: [
    BasicOperatorsDemoComponent,
    SearchInputDemoComponent,
    SwitchmapSearchDemoComponent,
    SubscriptionManagementDemoComponent,
  ],
  templateUrl: './rxjs-presentation.component.html',
  styleUrl: './rxjs-presentation.component.css',
})
export class RxjsPresentationComponent {
  currentSlideIndex = 0;
  slides: Slide[] = content;

  get currentSlide(): Slide {
    return this.slides[this.currentSlideIndex];
  }

  nextSlide(): void {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex++;
    }
  }

  previousSlide(): void {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    }
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.currentSlideIndex = index;
    }
  }
}
