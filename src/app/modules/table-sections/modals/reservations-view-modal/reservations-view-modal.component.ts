import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationsService } from '../../../services/reservations.service';
import { RoomsService } from '../../../services/rooms.service';

@Component({
  selector: 'app-reservations-view-modal',
  templateUrl: './reservations-view-modal.component.html',
  styleUrls: ['./reservations-view-modal.component.scss']
})
export class ReservationsViewModalComponent {

  @ViewChild('content') content;
  @Output('onClose') onClose: EventEmitter<void> = new EventEmitter<void>();

  private request: Object;

  public model = {
    status: '',
    message: ''
  };

  public roomStatus = '';

  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal, private reservationsService: ReservationsService, private roomsService: RoomsService) {}

  open(request: Object) {
  	this.request = request;
    this.model.status = request['status'];
    
    this.roomsService.getRoom(this.request['roomId']).subscribe((data: Object) => {
      this.roomStatus = data['status'];
    });

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }

  public save(c: Function): void {
    this.request['message'] = this.model.message;
    this.request['status'] = this.model.status;
    
    this.reservationsService.updateRequest(this.request['_id'], this.request).then((status: boolean) => {
      this.onClose.emit();
      c();
    })
  }

}