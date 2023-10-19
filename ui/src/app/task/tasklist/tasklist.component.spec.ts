import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasklistComponent } from './tasklist.component';
import { TaskServices } from '../services/task.services';
import { Task } from '../model/task';
import { from, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('TasklistComponent', () => {
  let component: TasklistComponent;
  let fixture: ComponentFixture<TasklistComponent>;
  let taskServices: TaskServices;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasklistComponent],
      imports: [HttpClientModule]
    });

    fixture = TestBed.createComponent(TasklistComponent);
    component = fixture.componentInstance;
    taskServices = TestBed.inject(TaskServices);

    // Stub the GET request for tasks
    const mockTasks: Task[] = [
      {
        id: 1,
        description: 'complete the BP3 ui code challenge',
        status: 'incomplete',
      },
      {
        id: 2,
        description: 'showcase some cool angular skills',
        status: 'incomplete',
      },
      {
        id: 3,
        description: 'have fun!',
        status: 'incomplete',
      },
    ];

    spyOn(taskServices, 'getTasks').and.returnValue(from(Promise.resolve(mockTasks)));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on load', async () => {
    await component.ngOnInit();
    expect(component.tasks).toEqual([
      {
        id: 1,
        description: 'complete the BP3 ui code challenge',
        status: 'incomplete',
      },
      {
        id: 2,
        description: 'showcase some cool angular skills',
        status: 'incomplete',
      },
      {
        id: 3,
        description: 'have fun!',
        status: 'incomplete',
      },
    ]);
  });

  it('should create a task', async () => {
    const mockTask: Task = {
      id: 4,
      description: 'New Task',
      status: 'incomplete',
    };
    spyOn(taskServices, 'saveTask').and.returnValue(from(Promise.resolve(mockTask)));

    component.newTaskName = 'New Task';
    await component.onCreatTaskClick();

    expect(component.tasks).toContain(mockTask);
    expect(component.newTaskName).toBeNull();
  });

  it('should display an error message if special characters or numbers are entered for description', () => {
    component.newTaskName = 'Invalid@Task';
    component.validateNewTaskInput();

    expect(component.showInputErrorWarning).toBeTruthy();
  });

  afterEach(() => {
    // No need to verify HTTP requests since they are stubbed
  });
});
