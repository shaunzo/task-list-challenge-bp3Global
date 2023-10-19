import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskRoutingModule } from './task-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TasklistComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    TasklistComponent
  ]
})
export class TaskModule { }
