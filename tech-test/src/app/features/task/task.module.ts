import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TaskRoutingModule } from "./task-routing.module";

import { PAGE } from "./page";
import { PARTIALS } from "./partials";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [...PAGE, ...PARTIALS],
  imports: [CommonModule, TaskRoutingModule, SharedModule],
})
export class TaskModule {}
