import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartsComponent } from './bar-charts/bar-charts.component';
import { HorizontalBarChartsComponent } from './horizontal-bar-charts/horizontal-bar-charts.component';
import { NestedDonutChartsComponent } from './nested-donut-charts/nested-donut-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartsComponent,
    HorizontalBarChartsComponent,
    NestedDonutChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
