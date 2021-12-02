import { Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin, Subject, zip } from 'rxjs';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.scss'],
})
export class Comp3Component implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const obs1$ = new Subject<string>();
    const obs2$ = new Subject<string>();
    // (1))
    zip(obs1$, obs2$).subscribe(([v1, v2]) => console.log('(1)', v1, v2));

    // (2)
    combineLatest([obs1$, obs2$]).subscribe(([v1, v2]) =>
      console.log('(2)', v1, v2)
    );

    // (3)
    forkJoin([obs1$, obs2$]).subscribe(([v1, v2]) =>
      console.log('(3)', v1, v2)
    );

    //  ----------------------------------------------------------
    // Emit values
    obs1$.next('1-1'); // This value won't be displayed
    obs2$.next('2-1');
    obs2$.next('2-2');
    obs1$.next('1-2');
    obs2$.next('2-3');
    obs1$.next('1-3');
    obs2$.next('2-4');
    //
    // for (3) forkJoin :
    obs1$.complete();
    obs2$.complete();
  }
}
