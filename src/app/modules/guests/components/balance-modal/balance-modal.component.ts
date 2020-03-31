import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GuestsService } from '../../../services/guests.service';

import { IGuest } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-guests-balance-modal',
  templateUrl: './balance-modal.component.html',
  styleUrls: ['./balance-modal.component.scss']
})
export class GuestsBalanceModalComponent {

  @ViewChild('content') content;
  @Output('onClose') onClose: EventEmitter<void> = new EventEmitter<void>();

  private guest: IGuest;

  public model = {
    amount: ''
  };

  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal, private guestsService: GuestsService) {}

  open(guest: IGuest) {
  	this.guest = guest;

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }

  public save(c: Function): void {
    this.guestsService.refillBalance(this.guest._id, parseInt(this.model.amount)).then((status: boolean) => {
      this.model.amount = '';
      this.onClose.emit();
      c();
    });
  }
}
