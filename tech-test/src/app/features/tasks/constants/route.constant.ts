import { Route } from "@angular/router";
import { TaskNewComponent } from "../page/task-new/task-new.component";

import { TasksComponent } from "../page/tasks/tasks.component";

export enum RoutePath {
  BLANK = "",
  NEW = "new/:id",
}

export const TASKS_ROUTES: Route[] = [
  {
    path: RoutePath.BLANK,
    component: TasksComponent,
  },
  {
    path: RoutePath.NEW,
    component: TaskNewComponent,
  },
];
