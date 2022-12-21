import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Task } from "@interfaces/task.interface";
import { TasksService } from "@services/tasks/tasks.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent {
  taskData$: Observable<Task>;
  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) {
    const taskId = parseInt(this.route.snapshot.params["id"]);
    this.taskData$ = this.tasksService.loadTaskById(taskId);
  }
}
