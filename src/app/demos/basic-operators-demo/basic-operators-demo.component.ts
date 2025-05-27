import { Component, OnInit } from '@angular/core';

import { of } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-basic-operators-demo',
  imports: [],
  templateUrl: './basic-operators-demo.component.html',
  styleUrl: './basic-operators-demo.component.css',
})
export class BasicOperatorsDemoComponent implements OnInit {
  mapResults: number[] = [];
  filterResults: number[] = [];
  combineResults: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.demoMapOperator();
    this.demoFilterOperator();
    this.demoCombinedOperators();
  }

  demoMapOperator(): void {
    of(1, 2, 3)
      .pipe(map((value) => value * 2))
      .subscribe((result) => {
        this.mapResults.push(result);
        console.log('Map result:', result);
      });
  }

  demoFilterOperator(): void {
    of(1, 2, 3, 4, 5)
      .pipe(filter((value) => value % 2 === 0))
      .subscribe((result) => {
        this.filterResults.push(result);
        console.log('Filter result:', result);
      });
  }

  demoCombinedOperators(): void {
    of(1, 2, 3, 4, 5)
      .pipe(
        tap((val) => console.log('Before filter:', val)),
        filter((val) => val % 2 === 0),
        tap((val) => console.log('After filter, before map:', val)),
        map((val) => val * 10),
        tap((val) => console.log('After map:', val))
      )
      .subscribe((result) => {
        this.combineResults.push(result);
        console.log('Final result:', result);
      });
  }

  runDemoAgain(): void {
    this.mapResults = [];
    this.filterResults = [];
    this.combineResults = [];

    this.demoMapOperator();
    this.demoFilterOperator();
    this.demoCombinedOperators();
  }
}
