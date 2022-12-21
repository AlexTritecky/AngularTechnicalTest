import { Component, Input } from "@angular/core";
import { Task } from "@interfaces/task.interface";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent {
  @Input()
  tasks: Task[] | null = [];

  constructor() {}
}
