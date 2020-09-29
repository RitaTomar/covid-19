import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-covid-nav',
  templateUrl: './covid-nav.component.html',
  styleUrls: ['./covid-nav.component.scss']
})
export class CovidNavComponent  {

  @Output() public stateValue = new EventEmitter<string>();
  constructor(public router: Router) { }

  public navigateToHome(): void {
    this.router.navigateByUrl('/');
  }

  public viewStateCases(state: string): void {
    this.stateValue.emit(state);
  }

}
