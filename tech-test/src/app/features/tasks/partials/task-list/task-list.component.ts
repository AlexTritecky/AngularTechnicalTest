import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Task } from "@interfaces/task.interface";
import { TaskListStore } from "@services/tasks/task-list.store";
import { ConfirmationComponent } from "@shared/components/confirmation/confirmation.component";
import { EditingComponent } from "@shared/components/editing/editing.component";
import { filter, tap } from "rxjs";

export interface DialogData {
  message: string;
  buttonText: {
    ok: string;
    cancel: string;
  };
}

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent {
  @Input()
  tasks: Task[] | null = [];

  constructor(private dialog: MatDialog, private taskStore: TaskListStore) {}

  deleteTask(id: number) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        message: "Are you sure want to delete?",
        buttonText: {
          ok: "Yes",
          cancel: "No",
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.taskStore.deleteTask(id);
      }
    });
  }

  editTask(task: Task) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = task;

    const dialogRef = this.dialog.open(EditingComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe();
  }
}
