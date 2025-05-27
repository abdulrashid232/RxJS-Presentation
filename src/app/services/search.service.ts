import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface SearchResult {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly mockData: SearchResult[] = [
    { id: 1, name: 'Observable', description: 'Core building block of RxJS' },
    {
      id: 2,
      name: 'Subject',
      description:
        'Special type of Observable that allows values to be multicasted',
    },
    {
      id: 3,
      name: 'BehaviorSubject',
      description:
        'Subject that requires an initial value and emits current value',
    },
    {
      id: 4,
      name: 'ReplaySubject',
      description:
        'Subject that replays n number of emitted values to new subscribers',
    },
    {
      id: 5,
      name: 'AsyncSubject',
      description: 'Subject that emits only the last value when completed',
    },
    {
      id: 6,
      name: 'map',
      description: 'Transforms each value emitted by the source Observable',
    },
    {
      id: 7,
      name: 'filter',
      description: 'Filters items emitted by the source Observable',
    },
    {
      id: 8,
      name: 'switchMap',
      description:
        'Projects each source value to an Observable, switches to new inner Observable',
    },
    {
      id: 9,
      name: 'mergeMap',
      description:
        'Projects each source value to an Observable, merges emissions',
    },
    {
      id: 10,
      name: 'concatMap',
      description:
        'Projects each source value to an Observable, concatenates emissions',
    },
    {
      id: 11,
      name: 'exhaustMap',
      description:
        'Projects each source value to an Observable, ignores new emissions until inner completes',
    },
    {
      id: 12,
      name: 'debounceTime',
      description:
        'Emits a value after a specified time has passed without another emission',
    },
    {
      id: 13,
      name: 'distinctUntilChanged',
      description: 'Emits items that are distinct from the previous item',
    },
    {
      id: 14,
      name: 'takeUntil',
      description: 'Emits values until a notifier Observable emits a value',
    },
  ];

  constructor() {}

  search(term: string): Observable<SearchResult[]> {
    console.log(`Search API called with term: ${term}`);

    return of(this.filterResults(term)).pipe(
      delay(500)
    );
  }

  private filterResults(term: string): SearchResult[] {
    if (!term.trim()) {
      return [];
    }

    term = term.toLowerCase();
    return this.mockData.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
  }
}
