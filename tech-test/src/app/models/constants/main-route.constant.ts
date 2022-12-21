import { Route } from "@angular/router";

export enum RoutePath {
  BLANK = "",
  TASK = "tasks/:id",
}

export const ROUTES: Route[] = [
  {
    path: RoutePath.BLANK,
    loadChildren: () =>
      import("@features/tasks/tasks.module").then((m) => m.TasksModule),
  },
  {
    path: RoutePath.TASK,
    loadChildren: () =>
      import("@features/task/task.module").then((m) => m.TaskModule),
  },
];
