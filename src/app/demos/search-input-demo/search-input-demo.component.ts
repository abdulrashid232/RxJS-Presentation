import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

interface SearchEvent {
  term: string;
  timestamp: Date;
  type: 'raw' | 'debounced' | 'distinct';
}

@Component({
  selector: 'app-search-input-demo',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-input-demo.component.html',
  styleUrl: './search-input-demo.component.css',
})
export class SearchInputDemoComponent implements OnInit, OnDestroy {
  searchTerm = '';

  private readonly searchTerms = new Subject<string>();

  searchEvents: SearchEvent[] = [];

  private subscription: Subscription | null = null;

  constructor() {}

  ngOnInit() {
    this.subscription = this.searchTerms
      .pipe(
        tap((term) => {
          this.searchEvents.unshift({
            term,
            timestamp: new Date(),
            type: 'raw',
          });
        }),
        debounceTime(400),
        tap((term) => {
          this.searchEvents.unshift({
            term,
            timestamp: new Date(),
            type: 'debounced',
          });
        }),
        distinctUntilChanged(),
        tap((term) => {
          this.searchEvents.unshift({
            term,
            timestamp: new Date(),
            type: 'distinct',
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSearch(term: string): void {
    this.searchTerms.next(term);
  }

  clearEvents(): void {
    this.searchEvents = [];
  }

  getFormattedTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    });
  }

  getEventClass(type: string): string {
    switch (type) {
      case 'raw':
        return 'raw-event';
      case 'debounced':
        return 'debounced-event';
      case 'distinct':
        return 'distinct-event';
      default:
        return '';
    }
  }
}
