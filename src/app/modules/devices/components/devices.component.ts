import { Component, OnInit, ViewChild } from '@angular/core';
import { ISection } from '../../../interfaces/interfaces';

import { DevicesService } from '../../services/devices.service';
import { DevicesModalComponent } from './devices-modal/devices-modal.component';
import { DevicesDetailsModalComponent } from './devices-details-modal/devices-details-modal.component';

@Component({
  selector: 'app-section-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})

export class DevicesSectionComponent implements ISection, OnInit {
	title = "section.tablets"

	@ViewChild('modal') modal: DevicesModalComponent;
	@ViewChild('modalDetails') modalDetails: DevicesDetailsModalComponent;

	public data: Array<Object> = [];

	public filter = {
		assigned: 'all',
		mac: '',
		date: '',
		room: ''
	};

	public openModal(device: Object): void {
		this.modal.open(device);
	}

	public openDetailsModal(device: Object, event: Event): void {
		if(event.target['nodeName'] == 'BUTTON'){
			return;
		}

		this.modalDetails.open(device);
	}

	public setTab(tab: string): void {
		this.filter.assigned = tab;
		this.updateDevices();
	}

	public apply(model: Object): void {
		for(let key in model){
			this.filter[key] = model[key];
		}

		this.updateDevices();
	}

	public isCurrentTab(tab: string): boolean {
		return this.filter.assigned == tab;
	}

	public updateDevices(): void {
		this.devicesService.getDevices(this.filter).subscribe(
			(data: Array<Object>) => {
				this.data.splice(0, this.data.length);

				for(let i = 0; i < data.length; i++){
					if(!data[i].hasOwnProperty('current_page')){
						this.data.push(data[i]);
					}
				}
			},
			err => console.error(err),
		);
	}

	ngOnInit(){
		this.updateDevices();
	}

	constructor(private devicesService: DevicesService){}
}
