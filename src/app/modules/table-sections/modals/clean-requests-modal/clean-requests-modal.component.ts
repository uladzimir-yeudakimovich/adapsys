import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CleanRequestsService } from '../../../services/clean-requests.service';

@Component({
  selector: 'app-clean-requests-modal',
  templateUrl: './clean-requests-modal.component.html',
  styleUrls: ['./clean-requests-modal.component.scss']
})
export class CleanRequestsModalComponent {

  @ViewChild('content') content;
  @Output('onClose') onClose: EventEmitter<void> = new EventEmitter<void>();

  private request: Object;

  public model = {
    status: '',
    message: ''
  };

  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal, private cleanRequestsService: CleanRequestsService) {}

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
    
    this.cleanRequestsService.updateRequest(this.request['_id'], this.request).then((status: boolean) => {
      this.onClose.emit();
      c();
    })
  }

}