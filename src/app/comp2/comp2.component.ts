import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, switchAll, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.scss'],
})
export class Comp2Component implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // (1)
    // Créez les deux observables
    const obs1$ = new Subject<number>();
    // Subscribe
    obs1$.pipe(map((v) => v * 10)).subscribe((v) => console.log('(1)', v));
    // Emit values
    obs1$.next(1);
    obs1$.next(2);
    obs1$.next(3);

    // (2)
    const obs11$ = new Subject<string>();
    const obs22$ = new Subject<string>();
    // opérateurs essayés indépendamment
    obs11$
      .pipe(switchMap((v1) => obs22$.pipe(map((v2) => v1 + ' ' + v2))))
      .subscribe((v) => console.log('(2)', v));

    // (2bis)
    // Samething with switchAll()
    obs11$
      .pipe(map((v1) => obs22$.pipe(map((v2) => v1 + ' ' + v2)), switchAll()))
      .subscribe((v) => console.log('(2bis)', v));

    // Emit values
    /*
    obs11$.next('1-1'); // This value won't be displayed
    obs22$.next('2-1');
    obs22$.next('2-2');
    obs11$.next('1-2');
    obs22$.next('2-3');
    obs11$.next('1-3');
    obs22$.next('2-4');
    obs11$.complete();
    obs22$.complete();
*/
    obs11$.next('1'); // This value won't be displayed
    obs22$.next('2');
    obs22$.next('4');
    obs11$.next('5');
    obs22$.next('6');
    obs11$.next('7');
    obs22$.next('8');
    obs11$.complete();
    obs22$.complete();
  }
}
