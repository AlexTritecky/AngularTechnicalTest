import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { COMPONENTS } from "./components";
import { MODULES } from "./modules";

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ...MODULES],
  exports: [...COMPONENTS, ...MODULES],
})
export class SharedModule {}
