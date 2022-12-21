import { Injectable, Injector } from "@angular/core";
import { Task } from "@interfaces/task.interface";
import { ApiService } from "@shared/classes/api.class";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TasksService extends ApiService {
  constructor(injector: Injector) {
    super(injector);
  }

  loadAllTasks(): Observable<Task[]> {
    return this.get<Task[]>("tasks");
  }
}
