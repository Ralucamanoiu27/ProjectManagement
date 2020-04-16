import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';


@Component({
  selector: 'app-widget-statusbar',
  templateUrl: './statusbar.component.html',
  styleUrls: ['./statusbar.component.scss']
})
export class StatusbarComponent implements OnInit {

  chartOptions: {};
  Highcharts = Highcharts;
  @Input() data = [];
  @Input() label = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.chartOptions = {

      title: {
          text: 'Chart.update'
      },

      subtitle: {
          text: 'Plain'
      },

      xAxis: {
          enabled: false,
          categories: this.label
      },
      exporting: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      series: [{
          type: 'column',
          colorByPoint: true,
          data: this.data,
          showInLegend: false
      }]

  };
  }

  ngOnInit(): void {


            HC_exporting(Highcharts);
            setTimeout(() => {
              window.dispatchEvent(
                new Event('resize')
              );
            }, 300);
  }
}


