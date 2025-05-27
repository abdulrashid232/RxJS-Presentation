import {
  Component,
  OnDestroy,
  OnInit,
  DestroyRef,
  inject,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subject, Observable, Subscription } from 'rxjs';
import { takeUntil, map, take } from 'rxjs/operators';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-subscription-management-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-management-demo.component.html',
  styleUrl: './subscription-management-demo.component.css',
})
export class SubscriptionManagementDemoComponent implements OnInit, OnDestroy {
  manualCounter = 0;
  takeUntilCounter = 0;
  takeUntilDestroyedCounter = 0;
  asyncPipeCounter = 0;

  private destroy$ = new Subject<void>();
  asyncCounter$!: Observable<number>;


  signalCounter$ = interval(1000).pipe(takeUntil(this.destroy$),map((val) => val + 1));
  counter = toSignal(this.signalCounter$, { initialValue: 0 });

  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);


  private subscription: Subscription | null = null;
  private takeUntilDestroyedSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.setupManualSubscription();
    this.setupTakeUntilSubscription();
    this.setupTakeUntilDestroyedSubscription();
    this.setupAsyncPipeObservable();
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      console.log('Manual subscription unsubscribed');
      this.subscription.unsubscribe();
    }

    this.destroy$.next();
    this.destroy$.complete();
    console.log('destroy$ completed');
  }

  // Pattern 1: Manual subscription and unsubscribe
  setupManualSubscription(): void {
    this.subscription = interval(1000)
      .pipe(map((val) => val + 1))
      .subscribe((val) => {
        this.manualCounter = val;
        console.log('Manual subscription:', val);
      });
  }

  // Pattern 2: Using takeUntil with a destroy$ Subject
  setupTakeUntilSubscription(): void {
    interval(1000)
      .pipe(
        map((val) => val + 1),
        takeUntil(this.destroy$)
      )
      .subscribe((val) => {
        this.takeUntilCounter = val;
        console.log('takeUntil subscription:', val);
      });
  } 


  // Pattern 3: Using takeUntilDestroyed with DestroyRef
  
  setupTakeUntilDestroyedSubscription(): void {
    if (this.takeUntilDestroyedSubscription) {
      this.takeUntilDestroyedSubscription.unsubscribe();
      this.takeUntilDestroyedSubscription = null;
    }

    this.takeUntilDestroyedSubscription = interval(1000)
      .pipe(
        map((val) => val + 1),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((val) => {
        this.takeUntilDestroyedCounter = val;
        console.log('takeUntilDestroyed subscription:', val);
      });
  }

  // Pattern 4: Using async pipe with an Observable
  setupAsyncPipeObservable(): void {
    this.asyncCounter$ = interval(1000).pipe(map((val) => val + 1));
  }


  restartCounters(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$ = new Subject<void>();  
    this.manualCounter = 0;
    this.takeUntilCounter = 0;
    this.takeUntilDestroyedCounter = 0;   

    this.signalCounter$ = interval(1000).pipe(
      takeUntil(this.destroy$),
      map((val) => val + 1)
    );

    runInInjectionContext(this.injector, () => {
      this.counter = toSignal(this.signalCounter$, { initialValue: 0 });
    });

    this.setupManualSubscription();
    this.setupTakeUntilSubscription();
    this.setupTakeUntilDestroyedSubscription();

    this.setupAsyncPipeObservable();
  }
}
