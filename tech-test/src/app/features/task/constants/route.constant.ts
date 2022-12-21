import { Route } from "@angular/router";
import { TaskComponent } from "../page/task/task.component";

export enum RoutePath {
  BLANK = "",
}

export const TASK_ROUTES: Route[] = [
  {
    path: RoutePath.BLANK,
    component: TaskComponent,
  },
];
