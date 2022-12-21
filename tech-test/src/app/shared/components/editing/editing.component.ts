import { Component, Inject, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Task } from "@interfaces/task.interface";
import { TaskListStore } from "@services/tasks/task-list.store";
import { DestroySubscriptions } from "@shared/classes/destroy-subscriptions.class";

@Component({
  selector: "app-editing",
  templateUrl: "./editing.component.html",
  styleUrls: ["./editing.component.scss"],
})
export class EditingComponent{
  formTask: FormGroup;
  public submitted: boolean = false;
  task!: Task;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditingComponent>,
    @Inject(MAT_DIALOG_DATA) data: Task,
    private taskStore: TaskListStore
  ) {
    this.task = data;

    this.formTask = this.fb.group({
      label: [data.label, [Validators.required, Validators.minLength(4)]],
      description: [
        data.description,
        [Validators.required, Validators.minLength(4)],
      ],
      category: [data.category, [Validators.required, Validators.minLength(4)]],
      done: [data.done, Validators.required],
    });
  }

  get newsFormControls(): { [key: string]: AbstractControl } {
    return this.formTask.controls;
  }

  save() {
    this.submitted = true;
    if (this.formTask.invalid) {
      this.formTask.markAllAsTouched();
      return;
    }
    const changes = this.formTask.value;

    this.taskStore.saveTask(this.task.id, changes).subscribe();

    this.dialogRef.close(changes);
  }

  close() {
    this.dialogRef.close();
  }
}
