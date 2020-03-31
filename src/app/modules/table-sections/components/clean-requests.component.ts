import { Component, OnInit, ViewChild } from '@angular/core';
import { ISection } from '../../../interfaces/interfaces';
import { CleanRequestsService } from '../../services/clean-requests.service';
import { CleanRequestsModalComponent } from './../modals/clean-requests-modal/clean-requests-modal.component';

@Component({
  selector: 'app-clean-requests',
  template: `
  	<app-base-section [title]="this.title">
  		<app-clean-requests-modal #modal (onClose)="this.updateRequests()"></app-clean-requests-modal>
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
export class CleanRequestsComponent implements ISection, OnInit {
	@ViewChild('modal') modal: CleanRequestsModalComponent;

	public title = 'section.clean-requests';
	public tabs = ['all','new','accepted', 'completed', 'rejected', 'urgent'];
	public data = [

	];
	public headers = ['time-cleaning', 'room', 'date-order', 'status', 'empty-field'];

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

	public updateRequests(): void {
		this.cleanRequestsService.getRequests(this.filter).subscribe(
			(data: Array<Object>) => {
				this.data.splice(0, this.data.length);

				for(let i = 0; i < data.length; i++){
					if(data[i].hasOwnProperty('current_page')){
						continue;
					}
					
					this.data.push({
						cols:[
							data[i]['clean_date'],
							data[i]['room'],
							data[i]['date'],
							data[i]['status'],
							(data[i]['urgent'] ? '<span class="badge badge-danger">Urgent</span>' : '')
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
		this.updateRequests();
	}

	constructor(private cleanRequestsService: CleanRequestsService){}
}
