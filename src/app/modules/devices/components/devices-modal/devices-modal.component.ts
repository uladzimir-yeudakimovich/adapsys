import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomsService } from '../../../services/rooms.service';
import { GuestsService } from '../../../services/guests.service';
import { DevicesService } from '../../../services/devices.service';

import { IFeedRoom } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-devices-modal',
  templateUrl: './devices-modal.component.html',
  styleUrls: ['./devices-modal.component.scss']
})
export class DevicesModalComponent implements OnInit {

  @ViewChild('content') content;
  @Output('onClose') onClose: EventEmitter<void> = new EventEmitter<void>();

  public rooms: Array<IFeedRoom> = [];
  public guests: Array<Object> = [];

  private device: Object;

  public model = {
  	guest: '',
  	room: ''
  };

  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal, private roomsService: RoomsService, private guestsService: GuestsService, private devicesService: DevicesService) {}

  open(device: Object) {
  	this.device = device;
  	this.loadModel();

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }

  ngOnInit(){
  	this.roomsService.getRoomsFeed().subscribe((rooms: Array<IFeedRoom>) => {
  		this.rooms.splice(0, this.rooms.length);
  		this.rooms.push(...rooms);
  	});
  }

  private loadModel(): void {
  	if(this.device.hasOwnProperty('room')){
  		for(let room of this.rooms){
  			if(this.device['room'] == room.number){
  				this.model.room = room._id;
  				break;
  			}
  		}
  	}

  	if(this.device.hasOwnProperty('name') && this.model.room){
  		this.updateGuests().then(() => {
	  		for(let guest of this.guests){
	  			const name = `${guest['name']} ${guest['surname']}`;
	  			if(this.device['name'] == name){
	  				this.model.guest = guest['_id'];
	  				break;
	  			}
	  		}  			
  		})
  	}
  }

  public save(c: Function): void {

  	let guestName = '';
  	for(let guest of this.guests){
  		if(guest['_id'] == this.model.guest){
  			guestName = `${guest['name']} ${guest['surname']}`;
  			break;
  		}
  	}

  	let roomNumber = '';
  	for(let room of this.rooms){
  		if(room._id == this.model.room){
  			roomNumber = room.number;
  			break;
  		}
  	}

  	this.device['name'] = guestName;
  	this.device['room'] = roomNumber;

  	this.devicesService.updateDevice(this.device['_id'], this.device).then((status: boolean) => {
  		this.onClose.emit();
  		c();
  	});
  }

  public updateGuests(): Promise<void> {

  	return new Promise((resolve, reject) => {
	  	this.guests.splice(0, this.guests.length);

	  	if(this.model.room.length){
		  	this.guestsService.getGuestsByRoom(this.model.room).subscribe((guests: Array<Object>) => {
		  		this.guests.push(...guests);

		  		resolve();
		  	});
	  	} else {
	  		resolve();
	  	}
  	});
  }

}
