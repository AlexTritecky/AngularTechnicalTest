import { Route } from "@angular/router";
import { TasksComponent } from "../page/tasks/tasks.component";

export enum RoutePath {
  BLANK = "",
}

export const TASKS_ROUTES: Route[] = [
  {
    path: RoutePath.BLANK,
    component: TasksComponent,
  },
];
