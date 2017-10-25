import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarchartComponent } from './shared/barchart/barchart.component';
import { PieChartComponent } from './shared/pie-chart/pie-chart.component';
import { AusMapComponent } from './shared/aus-map/aus-map.component';

@NgModule({
  declarations: [
    AppComponent,
    BarchartComponent,
    PieChartComponent,
    AusMapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
