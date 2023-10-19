import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasklistComponent } from './tasklist.component';

describe('TasklistComponent', () => {
  let component: TasklistComponent;
  let fixture: ComponentFixture<TasklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // should load tasks on load...

  // should display error if error when fetching tasks

  // should create a task

  // Create task should be disabled if text field is empty

  // should throw error if creating task with id that already exists

  // should filter tasks by description

  // should indicate to user that there are no results if filter does not return any matches

  // should display an error message if special characters or numbers are enter for description
});
