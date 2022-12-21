import { Injectable, Injector } from "@angular/core";
import { Task, TaskStatus } from "@interfaces/task.interface";
import { ApiService } from "@shared/classes/api.class";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TasksService extends ApiService {
  constructor(injector: Injector) {
    super(injector);
  }

  loadAllTasks(): Observable<Task[]> {
    return this.get<Task[]>("tasks");
  }

  loadTaskById(taskId: number): Observable<Task> {
    return this.get<Task>(`tasks/${taskId}`).pipe(
      map((task) => {
        if (task.done === true) {
          return { ...task, status: TaskStatus.Done };
        }

        if (task.done === false) {
          return { ...task, status: TaskStatus.InProgress };
        }
        return task;
      })
    );
  }

  saveTask(taskId: number, changes: Partial<Task>): Observable<Task> {
    return this.put(`tasks/${taskId}`, changes);
  }

  addNewTask(changes: Partial<Task>): Observable<Task> {
    return this.post(`tasks`, changes);
  }

  deleteTask(taskId: number): Observable<Task[]> {
    return this.delete<Task[]>(`tasks/${taskId}`);
  }
}
