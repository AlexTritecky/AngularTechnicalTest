import { Router } from '@angular/router';
import { Component } from "@angular/core";
import { TaskListStore } from "@services/tasks/task-list.store";
import { Task } from "@interfaces/task.interface";
import { Observable } from "rxjs";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent {
  tasksList$: Observable<Task[]>;
  doneTasksList$: Observable<Task[]>;
  inProgressTasksList$: Observable<Task[]>;

  constructor(private taskStore: TaskListStore, private router: Router) {
    this.tasksList$ = this.taskStore.taskListStore$;
    this.doneTasksList$ = this.taskStore.filterByDoneTask(true);
    this.inProgressTasksList$ = this.taskStore.filterByDoneTask(false);
  }

  createNew() {
    this.tasksList$.subscribe((tasks) => {
      const newId = tasks.slice(-1)[0].id + 1;
      this.router.navigate(["/new", newId]);

    });
  }
}
