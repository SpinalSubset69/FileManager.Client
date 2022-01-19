import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuhtInterceptor } from './shared/httpInterceptors/authInterceptor';
import { errorInterceptor } from './shared/httpInterceptors/errorInterceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule,
    NgxChartsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuhtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: errorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
