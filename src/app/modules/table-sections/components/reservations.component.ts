import { Component, OnInit, ViewChild } from '@angular/core';
import { ISection } from '../../../interfaces/interfaces';
import { ReservationsService } from '../../services/reservations.service';
import { ReservationsViewModalComponent } from './../modals/reservations-view-modal/reservations-view-modal.component';

@Component({
  selector: 'app-reservations',
  template: `
  	<app-base-section [title]="this.title">
  		<app-reservations-view-modal #modal (onClose)="this.updateRequests()"></app-reservations-view-modal>
	  	<div class="row mb-3">
	  		<div class="col-md-12">
	  			<sections-common-filter (onApply)="this.apply($event)"></sections-common-filter>
	  		</div>
	  	</div>
	  	<div class="row">
	  		<div class="col-md-9">
	  			<sections-common-tabs [list]="this.tabs" (change)="this.setTab($event)"></sections-common-tabs>
	  		</div>
	  		<div class="col-md-3">
	  			<pagination
	  				[count]="this.data.length"
	  				[perPage]="10"
	  				(change)="this.setPage"
	  			></pagination>
	  		</div>
	  	</div>
	  	<sections-common-table (onClick)="this.showModal($event)" [headers]="this.headers" [data]="this.data"></sections-common-table>
  	</app-base-section>
  `,
  styleUrls: ['./../scss/common.scss']
})
export class ReservationsComponent implements ISection, OnInit {
	@ViewChild('modal') modal: ReservationsViewModalComponent;

	public title = 'section.reservation';
	public tabs = ['all','new','accepted', 'completed', 'rejected', 'urgent'];
	public data = [

	];
	public headers = ['room', 'received', 'reservation-date', 'time-zone', 'place', 'persons-number', 'status'];

	private filter = {
		tab: '',
		date_to: '',
		date_from: '',
		room: ''
	}

	public reset(): void {
		this.filter.tab = '';
	}

	public apply(model: Object): void {
		for(let key in model){
			this.filter[key] = model[key];
		}

		this.updateRequests();
	}

	public setTab(tab: string): void {
		if(tab == 'all'){
			this.filter.tab = '';
		} else {
			this.filter.tab = tab.charAt(0).toUpperCase() + tab.slice(1);
		}
		
		this.updateRequests();
	}

	public showModal(obj: Object): void {
		this.modal.open(obj);
	}

	public updateRequests(): void {
		this.reservationsService.getRequests(this.filter).subscribe(
			(data: Array<Object>) => {
				this.data.splice(0, this.data.length);

				for(let i = 0; i < data.length; i++){
					if(data[i].hasOwnProperty('current_page')){
						continue;
					}
					
					this.data.push({
						cols:[
							data[i]['room'],
							data[i]['date'],
							data[i]['reservation_date'],
							data[i]['time_zone'],
							data[i]['object_name'],
							data[i]['persons_number'],
							data[i]['status']
						],
						_object: data[i]
					});
				}

				console.log(this.data);
			},
			err => console.error(err),
		);
	}

	ngOnInit(){
		this.updateRequests();
	}

	constructor(private reservationsService: ReservationsService){}
}
