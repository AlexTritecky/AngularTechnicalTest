import { Route } from "@angular/router";

export enum RoutePath {
  BLANK = "",
  TASK = "task/:id",
}

export const ROUTES: Route[] = [
  {
    path: RoutePath.BLANK,
    loadChildren: () =>
      import("@features/tasks/tasks.module").then(
        (m) => m.TasksModule
      ),
  },
];
