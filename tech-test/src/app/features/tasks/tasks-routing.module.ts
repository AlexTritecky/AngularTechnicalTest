import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TASKS_ROUTES } from "./constants/route.constant";

@NgModule({
  imports: [RouterModule.forChild(TASKS_ROUTES)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
