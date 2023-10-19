import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskRoutingModule } from './task/task-routing.module'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./task/task.module').then(m => m.TaskModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
