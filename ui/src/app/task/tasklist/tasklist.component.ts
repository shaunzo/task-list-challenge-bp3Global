import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskServices } from '../services/task.services';
import { Observable, Subscription } from 'rxjs';
import { Task } from '../model/task';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  incompleteTasks : Task[] = [];
  completedTasks : Task[] = [];
  filteredIncompleteTasks: Task[] = [];
  filterText: string = null;
  subscriptions = new Subscription();
  newTaskName: string = null;
  isLoading: boolean = true;
  descriptionRegexPattern = /^[a-zA-Z0-9]*$/;
  showInputErrorWarning: boolean = false;
  errorText: string = null;

  constructor(private taskServices: TaskServices) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.taskServices.getTasks().subscribe({
        next: (tasks) => {
          this.errorText = null;
          this.tasks = tasks;
          this.updateTaskLists();
        },
        error: (error) => {
          this.errorText = 'Error occured while fetching tasks.';
          console.error('Error fetching tasks', error);
        },
        complete: () => console.info('Fetched tasks')
      })
    )
  }

  updateTaskLists() {
    this.incompleteTasks = this.tasks.filter(i => i.status === 'incomplete');
    this.completedTasks = this.tasks.filter(i => i.status === 'complete');
  }

  completeTask(item: Task) {
    this.errorText = null;

    this.subscriptions.add(
      this.taskServices.completeTask(item.id.toString()).subscribe({
        next: (res) => {
          this.errorText = null;
          console.log(res);
        },
        error: (error) => {
          this.errorText = 'Error completing task!';
          console.error('Error completing task', error)
        }
      })
    )

  }

  filterTasks() {
    this.errorText = null;
    if(this.filterText) {
      this.filteredIncompleteTasks = this.incompleteTasks.filter(i => i.description.includes(this.filterText));
    } else {
      this.filteredIncompleteTasks = [];
    }
  }

  validateNewTaskInput() {
    this.errorText = null;
    if(this.newTaskName) {
      this.showInputErrorWarning = !this.descriptionRegexPattern.test(this.newTaskName);
    } else {
      this.showInputErrorWarning = false;
    }
  }

  onCreatTaskClick() {
    if(this.newTaskName) {
      this.errorText = null;

      this.taskServices.saveTask({
        id: this.tasks.length + 1,
        description: this.newTaskName,
        status: 'incomplete'
      }).subscribe({
        next: (data: Task | string) => {
          if(typeof data === 'string') {
            this.errorText = data === 'Task is undefined or null' ? 'Task param was not provided' : 'Error creating task';

          } else if(typeof data === 'object') {
            this.tasks.push(data);
            this.newTaskName = null;
            this.errorText = null;
            this.updateTaskLists();
          }
        },
        error: (error) => {
          this.errorText = 'Error creating task!';
          console.error('Error creating task', error);
        },
        complete: () => {
          console.info('Created task');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
