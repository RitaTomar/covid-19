import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { CovidDropdownComponent } from './covid-dropdown/covid-dropdown.component';

const routes: Routes = [
  { path: '', component: CovidDropdownComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovidRoutingModule { }
