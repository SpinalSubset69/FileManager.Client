import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    NavbarComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  exports:[
    NavbarComponent,
    PieChartComponent
  ]
})
export class SharedModule { }
