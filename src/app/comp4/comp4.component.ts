import { Component, OnInit } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { map, mergeAll, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-comp4',
  templateUrl: './comp4.component.html',
  styleUrls: ['./comp4.component.scss'],
})
export class Comp4Component implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const obs1$ = new Subject<string>();
    const obs2$ = new Subject<string>();
    // (1))
    merge(obs1$, obs2$).subscribe((v) => console.log('(1)', v));
    // Emit values
    obs1$.next('1-1');
    obs2$.next('2-1');
    obs2$.next('2-2');
    obs1$.next('1-2');
    obs2$.next('2-3');
    obs1$.next('1-3');
    obs2$.next('2-4');
    obs1$.next('1-4');

    // (2)
    const obs11$ = new Subject<string>();
    const obs22$ = new Subject<string>();
    obs11$
      .pipe(
        map((v) => obs22$.pipe(map((v2) => v + ' ' + v2))),
        mergeAll()
      )
      .subscribe((v) => console.log('(2)', v));

    //  ----------------------------------------------------------
    // Emit values
    obs11$.next('1'); // This value won't be displayed
    obs22$.next('2');
    obs22$.next('4');
    obs11$.next('5');
    obs22$.next('6');
    obs11$.next('7');
    obs22$.next('8');

    /*
    obs11$.next('1-1');
    obs22$.next('2-1');
    obs22$.next('2-2');
    obs11$.next('1-2');
    obs22$.next('2-3');
    obs11$.next('1-3');
    obs22$.next('2-4');
    obs11$.next('1-4');
    */

    // (3)
    const obs111$ = new Subject<string>();
    const obs222$ = new Subject<string>();
    obs111$
      .pipe(mergeMap((v) => obs222$.pipe(map((v2) => v + ' ' + v2))))
      .subscribe((v) => console.log('(3)', v));
    // Emit values
    obs111$.next('1'); // This value won't be displayed
    obs222$.next('2');
    obs222$.next('4');
    obs111$.next('5');
    obs222$.next('6');
    obs111$.next('7');
    obs222$.next('8');
  }
}
