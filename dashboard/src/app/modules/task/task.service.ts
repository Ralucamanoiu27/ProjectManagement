import { Injectable } from '@angular/core';
import { Task } from 'src/app/shared/model/task';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly TASK_API = `${environment.serverApiUrl}/api/tasks`;

  constructor(private httpClient: HttpClient) { }

  saveTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.TASK_API, task);
  }

  getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.TASK_API);
  }

  deleteTasks(id: number): Observable<Task> {
    return this.httpClient.delete<Task>(this.TASK_API + `/${id}`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(this.TASK_API + `/${id}`);

  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.httpClient.put<Task>(this.TASK_API + `/${id}`, task);
  }
  searchByName(nameParam: string) {
    return this.httpClient.get<Task[]>(this.TASK_API + '/search', {
      params: {name: nameParam }
    });
  }

}
