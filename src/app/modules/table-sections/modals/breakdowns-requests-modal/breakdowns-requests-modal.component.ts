import { Component, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-breakdowns-requests-modal',
  templateUrl: './breakdowns-requests-modal.component.html',
  styleUrls: ['./breakdowns-requests-modal.component.scss']
})
export class BreakdownsRequestsModalComponent {

  @ViewChild('content') content;

  private request: Object;

  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal) {}

  open(request: Object) {
  	this.request = request;

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }
}