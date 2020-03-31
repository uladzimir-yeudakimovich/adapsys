import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-devices-details-modal',
  templateUrl: './devices-details-modal.component.html',
  styleUrls: ['./devices-details-modal.component.scss']
})
export class DevicesDetailsModalComponent {

  @ViewChild('content') content;
  @Output('onClose') onClose: EventEmitter<void> = new EventEmitter<void>();

  private device: Object;

  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal) {}

  open(device: Object) {
  	this.device = device;

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }
}
