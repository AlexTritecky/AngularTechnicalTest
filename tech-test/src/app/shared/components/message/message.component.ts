import { Component } from "@angular/core";
import { MessageService } from "@services/messages/message.service";
import { Observable, tap } from "rxjs";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
})
export class MessageComponent {
  showMessages = false;

  errors$: Observable<string[]>;

  constructor(public messagesService: MessageService) {
    this.errors$ = this.messagesService.errors$.pipe(
      tap(() => (this.showMessages = true))
    );
  }

  onClose() {
    this.showMessages = false;
  }
}
