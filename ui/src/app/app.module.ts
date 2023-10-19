import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TaskServices} from './task/services/task.services';
import {HttpClientModule} from '@angular/common/http';
import { TaskModule } from './task/task.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TaskModule
  ],
  providers: [TaskServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
