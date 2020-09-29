import { Component, OnInit } from '@angular/core';
import { CovidService } from 'src/app/services/covid.service';
import { Chart } from 'chart.js';
import * as _ from 'lodash';

export type CovidNumber = {
  date: string[],
  active: number[],
  confirmed: number[],
  labels: [{ num: null, label: null }]
}
                                                                                                                                                   
@Component({
  selector: 'app-covid-dropdown',
  templateUrl: './covid-dropdown.component.html',
  styleUrls: ['./covid-dropdown.component.scss']
})
export class CovidDropdownComponent  {

  constructor(private _covidService: CovidService) {
    this._getCovidCases(this.state);
  }
  public state: 'Delhi' | 'Maharashtra' = 'Delhi';
  public chart = [];           
  public covidNumbers: CovidNumber;
  public aggregate = { active: null, confirmed: null };

  /* setting custom options on chart */
  private _options: object = {
    legend: {
      display: false,
      labels: {
        //fontColor: 'rgb(255, 99, 132)',
        fontSize: 30,
        padding: 30
      }
    },
    hover: {
      onHover: function (e) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          return this._displayCustomLabel(tooltipItem);
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        position: "left",
        id: "primary-axis",
        type: 'linear',
        scaleLabel: {
          display: true,
          labelString: 'Confirmed Cases',
          fontSize: 20,
          fontColor: 'rgb(15, 84, 94)'
        }
      }, {
        position: "right",
        id: "secondary-axis",
        type: 'linear',
        scaleLabel: {
          display: true,
          labelString: 'Active Cases',
          fontSize: 20,
          fontColor: 'black'
        }
      }]
    },
  };

   /* function to get covid numbers n draw chart */
   private _getCovidCases(state: string): void {

    let covidCases;
    let labels = [];

    /* call service to get covid numbers */
    this._covidService.getCovidData().subscribe((response: any) => {
      this.covidNumbers = { date: [], active: [], confirmed: [], labels: [null] }
      if (state === 'Delhi') {
        _.reverse(response.cases_time_series);
        covidCases = _.reverse(_.slice(response.cases_time_series, 85, 100));
      }
      else {
        covidCases = _.takeRight(response.cases_time_series, 50);
      }
      covidCases.map((object: any) => {
        this.covidNumbers.date.push(object.date);
        this.covidNumbers.active.push(object.dailyconfirmed);
        this.covidNumbers.confirmed.push(object.totalconfirmed);
        this._callNumberAPI(object.totalconfirmed, labels);
        this._callNumberAPI(object.dailyconfirmed, labels);
      });

      /* calculating total of active confirmed cases to display on UI */
      this.aggregate.active = _.sum(this.covidNumbers.active.map(Number));
      this.aggregate.confirmed = _.sum(this.covidNumbers.confirmed.map(Number));

      this._drawCovidChart();
    });
  }



  /* set type, data and options in chart */
  private _drawCovidChart(): void {
    const data = {
      labels: this.covidNumbers.date,
      datasets: [{
        yAxisID: 'primary-axis',
        fill: false,
        data: this.covidNumbers.confirmed,
        borderColor: '#fe8b36',
      }, {
        yAxisID: 'secondary-axis',
        fill: false,
        data: this.covidNumbers.active,
        borderColor: 'blue',
        backgroundColor: 'blue',
      }]
    }
    let canvas = document.getElementById('covidChart');
    this.chart = new Chart(canvas, {
      type: 'line',
      data: data,
      options: this._options
    });
    this._displayCustomLegend(this.chart);
  }

  /* call number api to get custom label on data points in chart */
  private _callNumberAPI(number: number, customlabels: any): void {
    this._covidService.callNumberAPI(number).subscribe((res) => {
      customlabels.push({ num: number, label: res });
      this.covidNumbers['labels'] = customlabels;
    });
  }

  /* handle dropdown change event */
  public viewStateCases(stateValue): void {
    this.state = stateValue;
    this._getCovidCases(stateValue);
  }

  /* setting custom legend on chart */
  private _displayCustomLegend(chart) {
    let myLegendContainer = document.getElementById('legend');
    myLegendContainer.innerHTML = chart.generateLegend();
    myLegendContainer.querySelector('span').innerHTML = this.state;
    myLegendContainer.querySelector('ul').style.listStyle = 'none';
  }

  /* tooltip or label to show on hover on data points */
  private _displayCustomLabel(tooltipItem): string {
    let label: string;
    if (this.covidNumbers.labels)
      this.covidNumbers.labels.map((object: any) => (object.num == tooltipItem.value) ? label = object.label : 'count');
    return label;
  }

}
