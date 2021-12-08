import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { filter, mapTo, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-toggling-state',
  templateUrl: './toggling-state.component.html',
  styleUrls: ['./toggling-state.component.scss'],
})
export class TogglingStateComponent implements OnInit {
  @ViewChild('btn', { static: true }) buttonRef!: ElementRef<HTMLButtonElement>;
  query = '';
  isSearchInputVisible$: Observable<boolean> = of(false);

  ngAfterViewInit() {
    this.isSearchInputVisible$ = merge(
      fromEvent(this.buttonRef.nativeElement, 'click').pipe(
        tap((e) => e.stopPropagation()),
        mapTo(true)
      ),
      fromEvent(document.body, 'click').pipe(
        tap((e) => e.stopPropagation()),
        filter(() => this.query === ''),
        mapTo(false)
      )
    ).pipe(startWith(false));
  }

  constructor() {}

  ngOnInit(): void {}
}
