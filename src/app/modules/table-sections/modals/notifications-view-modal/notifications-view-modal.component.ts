import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notifications-view-modal',
  templateUrl: './notifications-view-modal.component.html',
  styleUrls: ['./notifications-view-modal.component.scss']
})
export class NotificationsViewModalComponent {

  @ViewChild('content') content;
  @Output('onClose') onClose: EventEmitter<void> = new EventEmitter<void>();

  private notification: Object;

  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal) {}

  open(request: Object) {
  	this.notification = request;

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }
}