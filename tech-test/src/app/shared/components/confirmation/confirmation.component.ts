import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "@features/tasks/partials/task-list/task-list.component";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.scss"],
})
export class ConfirmationComponent {
  message: string = "Are you sure?";
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private dialogRef: MatDialogRef<ConfirmationComponent>
  ) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
