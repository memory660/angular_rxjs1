import { Component, OnInit } from '@angular/core';
//

import { first, take, single } from 'rxjs/operators';
import { EMPTY, range } from 'rxjs';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss'],
})
export class Comp1Component implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // (1)
    // Pour l'opérateur 'first()
    // Une erreur sera émise
    EMPTY.pipe(first()).subscribe(
      () => console.log('(1) On next reached.'),
      () => console.log('(1) On error reached.')
    );
    // (3)
    // Une erreur sera émise
    range(1, 10)
      .pipe(first((val) => val > 20))
      .subscribe(
        () => console.log('(3) On next reached.'),
        () => console.log('(3) On error reached.')
      );
    // (4)
    // Une erreur sera émise
    // first == take(1).single()
    EMPTY.pipe(take(1), single()).subscribe(
      () => console.log('(4) On next reached.'),
      () => console.log('(4) On error reached.')
    );

    // (2)
    // Pour l'opérateur take(1)
    // Rien ne se passera
    EMPTY.pipe(take(1)).subscribe(
      () => console.log('(2) On next reached.'),
      () => console.log('(2) On error reached.')
    );
  }
}
