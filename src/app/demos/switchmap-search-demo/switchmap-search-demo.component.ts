import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

interface SearchEvent {
  term: string;
  timestamp: Date;
  status: 'started' | 'cancelled' | 'completed';
}

@Component({
  selector: 'app-switchmap-search-demo',
  imports: [CommonModule, FormsModule],
  templateUrl: './switchmap-search-demo.component.html',
  styleUrl: './switchmap-search-demo.component.css',
})
export class SwitchmapSearchDemoComponent implements OnInit, OnDestroy {
  searchTerm = '';
  results: any[] = [];
  loading = false;

  searchEvents: SearchEvent[] = [];
  apiCallCount = 0;

  private readonly searchTerms = new Subject<string>();
  private readonly searchService = inject(SearchService);

  private subscription: Subscription | null = null;


  ngOnInit() {
    this.subscription = this.searchTerms
      .pipe(
        tap((term) => {
          this.searchEvents.unshift({
            term,
            timestamp: new Date(),
            status: 'started',
          });
          this.loading = true;
          this.apiCallCount++;
        }),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term: string) => {
          this.checkCancelledCalls();

          return this.searchService.search(term);
        })
      )
      .subscribe({
        next: (results) => {
          this.results = results;
          this.loading = false;

          this.searchEvents.unshift({
            term: this.searchTerm,
            timestamp: new Date(),
            status: 'completed',
          });

          console.log('Search completed:', this.searchTerm);
        },
        error: (err) => {
          console.error('Error in search:', err);
          this.loading = false;
        },
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  onSearch(term: string): void {
    this.searchTerms.next(term);
  }

  private checkCancelledCalls(): void {
    const startedEvents = this.searchEvents.filter(
      (event) => event.status === 'started'
    );
    const completedEvents = this.searchEvents.filter(
      (event) => event.status === 'completed'
    );

    // If there are more started than completed, some were cancelled
    if (startedEvents.length > completedEvents.length) {
      // Find terms that were started but not completed
      for (const startedEvent of startedEvents) {
        if (
          !completedEvents.some((event) => event.term === startedEvent.term)
        ) {
          const index = this.searchEvents.findIndex(
            (event) =>
              event.term === startedEvent.term && event.status === 'started'
          );

          if (index !== -1) {
            this.searchEvents[index].status = 'cancelled';
          }
        }
      }
    }
  }

  clearEvents(): void {
    this.searchEvents = [];
    this.apiCallCount = 0;
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


  getEventClass(status: string): string {
    switch (status) {
      case 'started':
        return 'started-event';
      case 'cancelled':
        return 'cancelled-event';
      case 'completed':
        return 'completed-event';
      default:
        return '';
    }
  }
}
