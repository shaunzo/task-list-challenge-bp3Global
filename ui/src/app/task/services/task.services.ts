import {Task, TaskStatus} from '../model/task';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskServices {
  private baseUrl = `${environment.baseAPIurl}`;

  constructor(private http: HttpClient){}

  getTasks(): Observable<Task[]> {
    const url = `${this.baseUrl}/tasks`;
    return this.http.get<string>(url).pipe(
      catchError(this.handleError<string>('getTasks'))
    );
  }

  saveTask(task: Task): Observable<Task | string> {
    if (!task) {
      // Handle the case where 'task' is undefined or null.
      return of('Task is undefined or null');
    }

    task.status = "incomplete"
    const url = `${this.baseUrl}/save-task`;
    return this.http.post<string>(url, task).pipe(
      catchError(this.handleError<string>('saveTask'))
    );
  }

  completeTask(taskId: string): Observable<string> {
    const url = `${this.baseUrl}/complete-task`;
    let params: HttpParams = new HttpParams();
    params = params.append('taskId', taskId);
    return this.http.post<string>(url, null, {params}).pipe(
      catchError(this.handleError<string>('completeTask'))
    );
  }

  private handleError<T>(operation = 'operation'): any {
    return (error: any): void => console.error('Error in ' + operation, error)
  }
}



