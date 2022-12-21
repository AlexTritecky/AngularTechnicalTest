import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TASK_ROUTES } from "./constants/route.constant";

@NgModule({
  imports: [RouterModule.forChild(TASK_ROUTES)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
