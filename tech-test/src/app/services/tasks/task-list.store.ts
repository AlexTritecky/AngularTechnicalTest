import { Data } from "./../../../../node_modules/webdriver-js-extender/built/spec/mockdriver.d";
import { Injectable, Injector } from "@angular/core";
import { Task, TaskStatus } from "@interfaces/task.interface";
import { LoadingService } from "@services/loading/loading.service";
import { MessageService } from "@services/messages/message.service";
import { ApiService } from "@shared/classes/api.class";
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
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
}
