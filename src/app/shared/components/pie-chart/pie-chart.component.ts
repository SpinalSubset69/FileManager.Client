import { Component, HostListener, Input, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  width:number = 700;
  height:number = 400;
  view: [number, number] = [this.width, this.height];
  @Input() data:any[] =[];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };


  @HostListener('window:resize', ["$event"])
  onResize(){
    this.resizeChart();
  }
  constructor() {
    this.resizeChart();
  }

  ngOnInit(): void {
    //console.log(this.data)
  }

  onSelect(data: any): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
   // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  private resizeChart(){
    if(document.documentElement.clientWidth <= 500){
      this.width = 350;
      this.height = 300;
      this.view = [this.width, this.height];
    }

    if(document.documentElement.clientWidth > 500){
      this.width = 700;
      this.height = 400;
      this.view = [this.width, this.height];
    }
  }
}
