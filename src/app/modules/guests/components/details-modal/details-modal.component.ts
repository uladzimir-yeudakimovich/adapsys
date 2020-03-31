import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IGuest } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-guests-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss']
})
export class GuestsDetailsModalComponent {

  @ViewChild('content') content;
  @Output('onClose') onClose: EventEmitter<void> = new EventEmitter<void>();

  public guest: IGuest;

  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal) {}

  open(guest: IGuest) {
  	this.guest = guest;

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }
}
