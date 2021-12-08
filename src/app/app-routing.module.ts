import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlackListComponent } from './black-list/black-list.component';
import { Comp1Component } from './comp1/comp1.component';
import { Comp2Component } from './comp2/comp2.component';
import { Comp3Component } from './comp3/comp3.component';
import { Comp4Component } from './comp4/comp4.component';
import { TogglingStateComponent } from './toggling-state/toggling-state.component';

const routes: Routes = [
  { path: 'comp1', component: Comp1Component },
  { path: 'comp2', component: Comp2Component },
  { path: 'comp3', component: Comp3Component },
  { path: 'comp4', component: Comp4Component },
  { path: 'black-list', component: BlackListComponent },
  { path: 'toggling-state', component: TogglingStateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
