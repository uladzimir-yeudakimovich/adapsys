import { Component, OnInit, ViewChild } from '@angular/core';
import { GuestsService } from '../../../services/guests.service';
import { GuestsBalanceModalComponent } from './../balance-modal/balance-modal.component';
import { GuestsEditModalComponent } from './../edit-modal/edit-modal.component';
import { GuestsDetailsModalComponent } from './../details-modal/details-modal.component';
import { IGuest } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-guests-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class GuestsListComponent {
	@ViewChild('balanceModal') balanceModal: GuestsBalanceModalComponent;
	@ViewChild('editModal') editModal: GuestsEditModalComponent; 
	@ViewChild('detailsModal') detailsModal: GuestsDetailsModalComponent;

	public data = [];

	public update(): void {
		this.guestsService.getGuests().subscribe(
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

	public showModalBalance(guest: IGuest): void {
		this.balanceModal.open(guest);
	}

	public showModalDetails(guest: IGuest): void {
		if(event.target['nodeName'] == 'BUTTON' || event.target['nodeName'] == 'INPUT'){
			return;
		}

		this.detailsModal.open(guest);
	}

	public showModalCreate(): void {
		this.editModal.open();
	}

	public showModalEdit(guest: Object): void {
		this.editModal.open(guest);
	}

	ngOnInit(){
		this.update();
	}

	constructor(private guestsService: GuestsService){}
}
