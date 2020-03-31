import { Component, ViewChild } from '@angular/core';
import { ISection } from '../../../interfaces/interfaces';
import { BreakdownsRequestsService } from '../../services/breakdowns-requests.service';
import { BreakdownsRequestsModalComponent } from './../modals/breakdowns-requests-modal/breakdowns-requests-modal.component';

@Component({
  selector: 'app-breakdown-requests',
  template: `
  	<app-base-section [title]="this.title">
  		<app-breakdowns-requests-modal #modal></app-breakdowns-requests-modal>
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
export class BreakdownRequestsComponent implements ISection {
	@ViewChild('modal') modal: BreakdownsRequestsModalComponent;

	public title = 'section.breakdowns';
	public tabs = ['all','new','accepted', 'completed', 'rejected', 'urgent'];
	public data = [

	];
	public headers = ['urgent', 'room', 'equipment', 'received', 'status'];

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

	public showModal(request: Object): void {
		this.modal.open(request);
	}

	public updateRequests(): void {
		this.breakdownsRequestsService.getRequests(this.filter).subscribe(
			(data: Array<Object>) => {
				this.data.splice(0, this.data.length);

				for(let i = 0; i < data.length; i++){
					if(data[i].hasOwnProperty('current_page')){
						continue;
					}
					
					this.data.push({
						cols:[
							(data[i]['urgent'] ? '<span class="badge badge-danger">Urgent</span>' : ''),
							data[i]['room'],
							data[i]['equipment'],
							data[i]['date'],
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

	constructor(private breakdownsRequestsService: BreakdownsRequestsService){}
}
