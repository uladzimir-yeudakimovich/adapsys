import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomsService } from '../../../services/rooms.service';

@Component({
  selector: 'app-room-edit-modal',
  templateUrl: './edit-room-modal.component.html',
  styleUrls: ['./edit-room-modal.component.scss']
})
export class RoomsEditModalComponent implements OnInit {

  @ViewChild('content') content;
  @Output('onClose') onClose: EventEmitter<void> = new EventEmitter<void>();

  public room: Object;
  public isCreate = true;

  public roomTypes: Array<Object> = [];

  public model = {
    number: '',
    type_id: '',
    local_work_time: {},
    status: "Available"
  };

  constructor(private modalService: NgbModal,
              private activeModal: NgbActiveModal,
              private roomsService: RoomsService) {}

  ngOnInit(): void {
    this.roomsService.getRoomTypes().subscribe(
        (data: Array<Object>) => {

          this.roomTypes.splice(0, this.roomTypes.length);
          this.roomTypes.push(...data);

        }
    );
  }

  open(room?: Object) {

    if(room){
      this.room = room;
      this.isCreate = false;
      this.loadModel();
    }

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }

  private loadModel(): void {
    for(let key in this.room){
      this.model[key] = this.room[key];
    }
  }

  public save(c: Function): void {
    const model = Object.assign({}, this.model);

    if(this.isCreate){
      this.roomsService.createRoom(model).then((status: boolean) => {
        this.onClose.emit();
        c();
      })
    } else {
      this.roomsService.updateRoom(model['_id'], model).then((status: boolean) => {
        this.onClose.emit();
        c();
      })
    }
  }
}
