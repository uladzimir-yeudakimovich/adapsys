import { Component, OnInit, ViewChild } from '@angular/core';
import { ISection } from '../../../interfaces/interfaces';
import { OrdersService } from '../../services/orders.service';
import { RoomOrdersModalComponent } from './../modals/room-orders-modal/room-orders-modal.component';

@Component({
  selector: 'app-room-orders',
  template: `
  	<app-base-section [title]="this.title">
  		<app-room-orders-modal #modal (onClose)="this.updateOrders()"></app-room-orders-modal>
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
export class RoomOrdersComponent implements ISection {
	@ViewChild('modal') modal: RoomOrdersModalComponent;

	public title = 'section.orders';
	public tabs = ['all','new','accepted', 'completed', 'rejected', 'urgent'];
	public data = [

	];
	public headers = ['urgent', 'room', 'received', 'status'];

	private filter = {
		tab: '',
		date_to: '',
		date_from: '',
		room: ''
	}

	public setTab(tab: string): void {
		if(tab == 'all'){
			this.filter.tab = '';
		} else {
			this.filter.tab = tab.charAt(0).toUpperCase() + tab.slice(1);
		}
		
		this.updateOrders();
	}

	public apply(model: Object): void {
		for(let key in model){
			this.filter[key] = model[key];
		}

		this.updateOrders();
	}

	public updateOrders(): void {
		this.ordersService.getOrders(this.filter).subscribe(
			(data: Array<Object>) => {
				this.data.splice(0, this.data.length);

				for(let i = 0; i < data.length; i++){
					if(data[i].hasOwnProperty('current_page')){
						continue;
					}

					this.data.push({
						cols: [
							(data[i]['urgent'] ? '<span class="badge badge-danger">Urgent</span>' : ''),
							data[i]['room'],
							data[i]['date'],
							data[i]['status'],
						],
						_object: data[i]
					});
				}

				console.log(this.data);
			},
			err => console.error(err),
		);
	}

	public showModal(obj: Object): void {
		this.modal.open(obj);
	}

	ngOnInit(){
		this.updateOrders();
	}

	constructor(private ordersService: OrdersService){}
}
