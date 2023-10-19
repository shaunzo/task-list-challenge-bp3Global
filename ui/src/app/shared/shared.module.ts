import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { AlertBoxComponent } from './alert-box/alert-box.component';



@NgModule({
  declarations: [
    LoaderComponent,
    AlertBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    AlertBoxComponent
  ]
})
export class SharedModule { }
