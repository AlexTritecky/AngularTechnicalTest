import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Task } from "@interfaces/task.interface";
import { TaskListStore } from "@services/tasks/task-list.store";
import { DestroySubscriptions } from "@shared/classes/destroy-subscriptions.class";

@Component({
  selector: "app-task-new",
  templateUrl: "./task-new.component.html",
  styleUrls: ["./task-new.component.scss"],
})
export class TaskNewComponent extends DestroySubscriptions implements OnInit {
  form!: FormGroup;
  public submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private taskStore: TaskListStore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  get newsFormControls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      label: ["", [Validators.required, Validators.minLength(4)]],
      description: ["", [Validators.required, Validators.minLength(4)]],
      category: ["", [Validators.required, Validators.minLength(4)]],
      done: [false, Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const taskId = parseInt(this.route.snapshot.params["id"]);
    const newTask: Task = {
      id: taskId,
      label: this.form.value.label,
      description: this.form.value.description,
      category: this.form.value.category,
      done: this.form.value.done,
    };

    this.taskStore.addTask(newTask).subscribe(() => {
      this.router.navigate([""]);
    });
  }
}
