import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-room-orders-modal',
  templateUrl: './room-orders-modal.component.html',
  styleUrls: ['./room-orders-modal.component.scss']
})
export class RoomOrdersModalComponent {

  @ViewChild('content') content;
  @Output('onClose') onClose: EventEmitter<void> = new EventEmitter<void>();

  public request: Object;

  public model = {
    status: '',
    message: ''
  };

  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal, private ordersService: OrdersService) {}

  open(request: Object) {
  	this.request = request;
    this.model.status = request['status'];

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }

  public save(c: Function): void {
    this.request['message'] = this.model.message;
    this.request['status'] = this.model.status;
    
    this.ordersService.updateOrder(this.request['_id'], this.request).then((status: boolean) => {
      this.onClose.emit();
      c();
    })
  }

}