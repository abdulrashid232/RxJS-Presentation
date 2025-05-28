# Angular RxJS Playground

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

## Introduction

This Angular application serves as an interactive playground for learning and experimenting with RxJS (Reactive Extensions for JavaScript). It includes several demo components that showcase different aspects of reactive programming with RxJS in Angular.

## RxJS Components Overview

### 1. Basic Operators Demo (`basic-operators-demo.component.ts`)

Demonstrates fundamental RxJS operators:

- **map**: Transforms each value emitted by an Observable.
- **filter**: Filters items emitted by an Observable based on a condition.
- **tap**: Performs side effects like logging without modifying the stream.

```typescript
// Example from the component
of(1, 2, 3)
  .pipe(map((value) => value * 2))
  .subscribe((result) => {
    // Outputs: 2, 4, 6
  });

of(1, 2, 3, 4, 5)
  .pipe(filter((value) => value % 2 === 0))
  .subscribe((result) => {
    // Outputs: 2, 4
  });
```

### 2. Search Input Demo (`search-input-demo.component.ts`)

Shows how to optimize user input handling with:

- **debounceTime**: Waits for a pause in emissions (400ms) before emitting the latest value.
- **distinctUntilChanged**: Only emits when the current value is different from the previous.

This pattern is perfect for search inputs to prevent excessive API calls while users are typing.

```typescript
searchTerms.pipe(debounceTime(400), distinctUntilChanged()).subscribe((term) => {
  // Process search term after user stops typing
});
```

### 3. SwitchMap Search Demo (`switchmap-search-demo.component.ts`)

Demonstrates how to handle API calls related to user input using:

- **switchMap**: Cancels previous in-flight requests when a new search term is entered.
- This prevents race conditions where results from older searches might overwrite newer results.

```typescript
searchTerms
  .pipe(
    debounceTime(400),
    distinctUntilChanged(),
    switchMap((term) => this.searchService.search(term))
  )
  .subscribe((results) => {
    // Display only the results from the most recent search
  });
```

### 4. Subscription Management Demo (`subscription-management-demo.component.ts`)

Illustrates different approaches to manage subscriptions and prevent memory leaks:

- **Manual Subscription**: Explicitly calling `unsubscribe()` in ngOnDestroy.
- **takeUntil Pattern**: Using a destroy$ Subject to signal completion.
- **takeUntilDestroyed**: Angular's modern approach using DestroyRef.
- **Async Pipe**: Declarative approach in templates with automatic unsubscription.
- **toSignal**: Converting Observables to Angular Signals.

```typescript
// takeUntil pattern
interval(1000)
  .pipe(
    map((val) => val + 1),
    takeUntil(this.destroy$)
  )
  .subscribe((val) => {
    // This subscription will be automatically cleaned up
  });

// takeUntilDestroyed pattern
interval(1000)
  .pipe(
    map((val) => val + 1),
    takeUntilDestroyed(this.destroyRef)
  )
  .subscribe((val) => {
    // Modern approach with Angular's DestroyRef
  });

// Converting Observable to Signal
counter = toSignal(
  interval(1000).pipe(
    takeUntil(this.destroy$),
    map((val) => val + 1)
  ),
  { initialValue: 0 }
);
```

### 5. Search Service (`search.service.ts`)

A service that simulates API calls for the search demos:

- Creates an Observable that emits filtered results after a delay.
- Demonstrates mocking asynchronous operations for testing and demos.

```typescript
search(term: string): Observable<SearchResult[]> {
  return of(this.filterResults(term)).pipe(
    delay(500) // Simulate network delay
  );
}
```

### 6. RxJS Presentation Component (`rxjs-presentation.component.ts`)

A slide deck component that ties all the demos together, presenting RxJS concepts in a structured way:

- Core concepts and fundamentals
- Practical examples with interactive demos
- Best practices for Angular applications

## Key RxJS Concepts Covered

1. **Observables & Observers**: The foundation of reactive programming
2. **Operators**: Pure functions for transforming, filtering, and combining streams
3. **Subjects**: Special Observables that allow multicasting
4. **Subscription Management**: Techniques to prevent memory leaks
5. **Higher-order Mapping Operators**: switchMap, mergeMap, concatMap, exhaustMap
6. **User Input Handling**: Optimizing user interactions with debounceTime and distinctUntilChanged
7. **Angular Integration**: How RxJS integrates with Angular features
8. **Signals Integration**: How to bridge RxJS Observables with Angular's new Signals API

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

## Additional Resources

- [Official RxJS Documentation](https://rxjs.dev)
- [RxJS Marbles for visualization](https://rxmarbles.com)
- [Learn RxJS](https://learnrxjs.io)
- [RxJS Operator Decision Tree](https://rxjs.dev/operator-decision-tree)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
