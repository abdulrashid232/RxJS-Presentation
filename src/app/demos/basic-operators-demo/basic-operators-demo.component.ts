import { Component } from '@angular/core';

import { of } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-basic-operators-demo',
  imports: [],
  templateUrl: './basic-operators-demo.component.html',
  styleUrl: './basic-operators-demo.component.css',
})
export class BasicOperatorsDemoComponent {
  mapResults: number[] = [];
  filterResults: number[] = [];
  combineResults: number[] = [];

  mapLogs: string[] = [];
  filterLogs: string[] = [];
  combinedLogs: { stage: string; value: number }[] = [];
  constructor() {}



  demoMapOperator(): void {
    of(1, 2, 3)
      .pipe(map((value) => value * 2))
      .subscribe((result) => {
        this.mapResults.push(result);
        this.mapLogs.push(`Map result: ${result}`);
        console.log('Map result:', result);
      });
  }

  demoFilterOperator(): void {
    of(1, 2, 3, 4, 5)
      .pipe(filter((value) => value % 2 === 0))
      .subscribe((result) => {
        this.filterResults.push(result);
        this.filterLogs.push(`Filter result: ${result}`);
        console.log('Filter result:', result);
      });
  }

  demoCombinedOperators(): void {
    of(1, 2, 3, 4, 5)
      .pipe(
        tap((val) => {
          this.combinedLogs.push({ stage: 'Before filter', value: val });
          console.log('Before filter:', val);
        }),
        filter((val) => val % 2 === 0),
        tap((val) => {
          this.combinedLogs.push({
            stage: 'After filter, before map',
            value: val,
          });
          console.log('After filter, before map:', val);
        }),
        map((val) => val * 10),
        tap((val) => {
          this.combinedLogs.push({ stage: 'After map', value: val });
          console.log('After map:', val);
        })
      )
      .subscribe((result) => {
        this.combineResults.push(result);
        this.combinedLogs.push({ stage: 'Final result', value: result });
        console.log('Final result:', result);
      });
  }

  runMapDemo(): void {
    this.mapResults = [];
    this.mapLogs = [];
    this.demoMapOperator();
  }

  runFilterDemo(): void {
    this.filterResults = [];
    this.filterLogs = [];
    this.demoFilterOperator();
  }

  runCombinedDemo(): void {
    this.combineResults = [];
    this.combinedLogs = [];
    this.demoCombinedOperators();
  }

  runDemoAgain(): void {
    this.mapResults = [];
    this.filterResults = [];
    this.combineResults = [];
    this.mapLogs = [];
    this.filterLogs = [];
    this.combinedLogs = [];

    this.demoMapOperator();
    this.demoFilterOperator();
    this.demoCombinedOperators();
  }
}
