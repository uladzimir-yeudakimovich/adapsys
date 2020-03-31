import { Component, OnInit, ViewChild } from '@angular/core';
import { ISection } from '../../../interfaces/interfaces';
import { RoomsEditModalComponent } from './edit-room-modal/edit-room-modal.component';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-section-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})

export class RoomsSectionComponent implements ISection, OnInit {

	@ViewChild('modal') modal: RoomsEditModalComponent;

	title = "section.rooms"

	public data: Array<Object> = [];
	public types: Array<Object> = [];
	public typesObject: Object = {};

	public filter = {
		n_from: '',
		n_to: '',
		type_id: ''
	}

	public updateRooms(): void {
		this.roomsService.getRooms(this.filter).subscribe(
			(data: Array<Object>) => {
				this.data.splice(0, this.data.length);

				for(let i = 0; i < data.length; i++){
					if(!data[i].hasOwnProperty('current_page')){
						this.data.push(data[i]);
					}
				}

				console.log(this.data);
			},
			err => console.error(err),
		);
	}

	private getTypes(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.roomsService.getRoomTypes().subscribe(
				(data: Array<Object>) => {

					this.types.splice(0, this.types.length);
					this.types.push(...data);

					for(let type of data){
						this.typesObject[type['_id']] = type['name'];
					}

					resolve( true );
				}, (err) => {
					resolve( false );
					console.error(err);
				}
			);
		});
	}

	public showCreateModal(): void {
		this.modal.open();
	}

	public showEditModal(obj: Object): void {
		this.modal.open(obj);
	}

	ngOnInit(){
		this.getTypes().then((status: boolean) => {
			if(status){
				this.updateRooms();
			}
		})
	}

	constructor(private roomsService: RoomsService){}
}
