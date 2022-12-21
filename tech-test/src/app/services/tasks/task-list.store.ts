import { Injectable } from "@angular/core";
import { Task, TaskStatus } from "@interfaces/task.interface";
import { LoadingService } from "@services/loading/loading.service";
import { MessageService } from "@services/messages/message.service";
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  shareReplay,
  tap,
  throwError,
} from "rxjs";
import { TasksService } from "./tasks.service";

@Injectable({
  providedIn: "root",
})
export class TaskListStore {
  private _taskList$ = new BehaviorSubject<Task[]>([]);
  public taskListStore$: Observable<Task[]> = this._taskList$.asObservable();

  constructor(
    private tasksService: TasksService,
    private loading: LoadingService,
    private message: MessageService
  ) {
    this.loadAllCourses();
  }

  private loadAllCourses() {
    const loadCourses$ = this.tasksService.loadAllTasks().pipe(
      map((response) => {
        return this.checkStatus(response);
      }),
      catchError((err) => {
        const message = "Could not load tasks";
        this.message.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap((tasks) => this._taskList$.next(tasks))
    );

    this.loading.showLoaderUntilCompleted(loadCourses$).subscribe();
  }

  filterByDoneTask(check: boolean): Observable<Task[]> {
    return this.taskListStore$.pipe(
      map((tasks) => {
        return tasks.filter((task) => task.done == check);
      })
    );
  }

  deleteTask(taskId: number) {
    this.tasksService
      .deleteTask(taskId)
      .pipe(
        tap((res) => {
          this.message.showErrors("Task deleted");

          return this.loadAllCourses();
        })
      )
      .subscribe();
  }

  checkStatus(array: Task[]): Task[] {
    return array.map((item) => {
      if (item.done === true) {
        return { ...item, status: TaskStatus.Done };
      }

      if (item.done === false) {
        return { ...item, status: TaskStatus.InProgress };
      }

      return item;
    });
  }

  saveTask(taskId: number, changes: Partial<Task>): Observable<Task> {
    const tasks = this._taskList$.getValue();

    const index = tasks.findIndex((task) => task.id == taskId);

    const newTask: Task = {
      ...tasks[index],
      ...changes,
    };

    const newTasks: Task[] = tasks.slice(0);

    newTasks[index] = newTask;

    this._taskList$.next(newTasks);

    return this.tasksService.saveTask(taskId, changes).pipe(
      tap(() => this.loadAllCourses()),
      catchError((err) => {
        const message = "Could not save course";
        console.log(message, err);
        this.message.showErrors(message);
        return throwError(err);
      }),
      shareReplay()
    );
  }

  addTask(changes: Partial<Task>): Observable<Task> {
    return this.tasksService.addNewTask(changes).pipe(
      tap(() => this.loadAllCourses()),
      catchError((err) => {
        const message = "Could not add new task";
        console.log(message, err);
        this.message.showErrors(message);
        return throwError(err);
      }),
      shareReplay()
    );
  }
}
