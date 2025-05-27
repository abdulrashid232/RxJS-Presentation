import { Component } from '@angular/core';

import { BasicOperatorsDemoComponent } from '../demos/basic-operators-demo/basic-operators-demo.component';
import { SearchInputDemoComponent } from '../demos/search-input-demo/search-input-demo.component';
import { SwitchmapSearchDemoComponent } from '../demos/switchmap-search-demo/switchmap-search-demo.component';
import { SubscriptionManagementDemoComponent } from '../demos/subscription-management-demo/subscription-management-demo.component';

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
    SubscriptionManagementDemoComponent
],
  templateUrl: './rxjs-presentation.component.html',
  styleUrl: './rxjs-presentation.component.css',
})
export class RxjsPresentationComponent {
  currentSlideIndex = 0;

  slides: Slide[] = [
    {
      title: 'RxJS: Simplifying Complex Asynchronous Operations',
      phase: 'Phase 1: The Absolute Essentials',
      goal: 'Setting the context and motivating why RxJS matters',
      content: [
        'RxJS is everywhere in Angular (HTTP, forms, router)',
        'It helps us manage streams of data over time',
        'Avoid callback hell and handle asynchronous logic gracefully',
        'Observables are lazy, can emit multiple values, and are cancelable',
        'pipe() is for chaining operators',
      ],
    },
    {
      title: 'Basic Operators: Transform & Filter',
      phase: 'Phase 1: The Absolute Essentials',
      goal: 'Introduce map and filter as fundamental operators',
      content: [
        'map(): Transforms each value emitted by the source Observable',
        'filter(): Emits only values that meet a condition',
        'tap(): For side effects like logging, doesn\'t change the stream',
      ],
      code: `import { of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

// map example
of(1, 2, 3).pipe(
  map(value => value * 2) // Emits 2, 4, 6
).subscribe(console.log);

// filter example
of(1, 2, 3).pipe(
  filter(value => value % 2 === 0) // Emits 2
).subscribe(console.log);`,
      demoComponent: 'basic-operators-demo',
      showCodeExample: true
    },

    {
      title: 'User Input with debounceTime & distinctUntilChanged',
      phase: 'Phase 2: Handling User Input & Asynchronous Flows',
      goal: 'Show how to optimize search/input fields',
      content: [
        'Scenario: Search input field that only triggers API calls when user stops typing',
        'debounceTime(ms): Wait for a pause in emissions',
        'distinctUntilChanged(): Only emit if the value is different from the last',
      ],
      code: `import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

// Get input element
const searchInput = document.getElementById('search');

// Create observable from input events
fromEvent(searchInput, 'input').pipe(
  map(event => (event.target as HTMLInputElement).value),
  debounceTime(400), // Wait for 400ms pause in typing
  distinctUntilChanged() // Only emit when value changes
).subscribe(value => {
  console.log('Search term:', value);
  // Make API call here
});`,
      demoComponent: 'search-input-demo'
    },
    {
      title: 'Higher-Order Mapping: switchMap',
      phase: 'Phase 2: Handling User Input & Asynchronous Flows',
      goal: 'Demystify switchMap as the go-to for HTTP calls related to user input',
      content: [
        'When an Observable emits another Observable (e.g., an HTTP call), switchMap will cancel any pending inner Observables and switch to the new one',
        'Analogy: Changing TV channels (you only watch one at a time)',
        'Perfect for search inputs to prevent race conditions',
      ],
      code: `import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

// From previous example, continuing:
fromEvent(searchInput, 'input').pipe(
  map(event => (event.target as HTMLInputElement).value),
  debounceTime(400),
  distinctUntilChanged(),
  switchMap(term => {
    // Previous HTTP request is cancelled when new term is entered
    return this.searchService.search(term);
  })
).subscribe(results => {
  // Only the results from most recent search are displayed
  this.displayResults(results);
});`,
      demoComponent: 'switchmap-search-demo'
    },
    {
      title: 'Other Higher-Order Mapping Operators',
      phase: 'Phase 2: Handling User Input & Asynchronous Flows',
      goal: 'Understand when to use other mapping operators',
      content: [
        'mergeMap: "Run all concurrently, don\'t cancel." (e.g., saving multiple items)',
        'concatMap: "Run sequentially, wait for each to finish." (e.g., chained operations)',
        'exhaustMap: "Ignore new emissions if one is already in progress." (e.g., preventing double-clicks on submit)',
      ],
      code: `// mergeMap: Process all concurrently
from([1, 2, 3]).pipe(
  mergeMap(id => http.get(\`/item/\${id}\`))
);

// concatMap: Process in sequence
from([1, 2, 3]).pipe(
  concatMap(id => http.get(\`/item/\${id}\`))
);

// exhaustMap: Ignore until current completes
fromEvent(submitButton, 'click').pipe(
  exhaustMap(() => http.post('/api/data', formData))
);`
    },

    {
      title: 'Subscription Management',
      phase: 'Phase 3: Cleanup & Best Practices',
      goal: 'Emphasize preventing memory leaks',
      content: [
        'Unsubscribed Observables can cause memory leaks',
        'async pipe: Best way for templates, unsubscribes automatically',
        'takeUntilDestroyed() (from @angular/core/rxjs-interop): Modern, clean way for component/service logic',
        'takeUntil(this.destroy$) pattern: Common in older Angular code',
        'manual unsubscribe(): Direct but verbose approach',
      ],
      demoComponent: 'subscription-management-demo'
    },
    {
      title: 'RxJS & Signals',
      phase: 'Phase 3: Cleanup & Best Practices',
      goal: 'Contextualize RxJS within the modern Angular landscape',
      content: [
        'RxJS for async streams & complex data flow (HTTP, events)',
        'Angular Signals for local, explicit UI state',
        'They work together! Use toSignal() to bring RxJS data to Signals for UI',
      ],
      code: `import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({...})
export class MyComponent {
  // RxJS observable
  private userProfile$ = this.http.get<UserProfile>('/api/profile').pipe(
    map(profile => this.transformProfile(profile))
  );
  
  // Convert to signal
  readonly profile = toSignal(this.userProfile$, { initialValue: DEFAULT_PROFILE });
  
  // Use in template:
  // {{ profile().name }}
}`
    },
    {
      title: 'Key Takeaways',
      phase: 'Phase 3: Cleanup & Best Practices',
      goal: 'Summarize the most important points',
      content: [
        'RxJS handles complexity of async operations',
        'Master debounceTime, distinctUntilChanged, switchMap for user input',
        'Always manage subscriptions (async pipe / takeUntilDestroyed)',
        'RxJS and Signals are complementary in modern Angular',
        'Start simple, add complexity as needed',
      ]
    },
    {
      title: 'Resources for Further Learning',
      content: [
        'Official RxJS Documentation: rxjs.dev',
        'RxJS Marbles for visualization: rxmarbles.com',
        'Learn RxJS: learnrxjs.io',
        'RxJS Operator Decision Tree: rxjs.dev/operator-decision-tree',
        'Angular University RxJS Course',
        'Egghead.io RxJS courses',
      ]
    }
  ];

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
