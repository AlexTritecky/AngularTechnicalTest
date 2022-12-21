import { SharedModule } from "@shared/shared.module";
import { PARTIALS } from "./partials/index";
import { PAGE } from "./page/index";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TasksRoutingModule } from "./tasks-routing.module";

@NgModule({
  declarations: [...PAGE, ...PARTIALS ],
  imports: [CommonModule, TasksRoutingModule, SharedModule],
})
export class TasksModule {}
