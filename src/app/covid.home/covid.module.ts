import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CovidRoutingModule } from './covid-routing.module';
import { CovidDropdownComponent } from './covid-dropdown/covid-dropdown.component';
import { CovidNavComponent } from './covid-dropdown/covid-nav/covid-nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CovidNavComponent, CovidDropdownComponent],
  imports: [
    CommonModule, CovidRoutingModule, NgbModule
  ],
  exports: [CovidNavComponent]
})
export class CovidModule { }
