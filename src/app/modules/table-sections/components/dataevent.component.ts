import { Component } from '@angular/core';
import { ISection } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-event-data',
  template: `
  	<app-base-section [title]="this.title">
	  	<div class="row mb-3">
	  		<div class="col-md-12">
	  			<sections-common-filter></sections-common-filter>
	  		</div>
	  	</div>
	  	<div class="row">
	  		<div class="col-md-9">
	  			<sections-common-tabs [list]="this.tabs"></sections-common-tabs>
	  		</div>
	  		<div class="col-md-3">
	  			<pagination
	  				[count]="this.data.length"
	  				[perPage]="10"
	  				(change)="this.setPage"
	  			></pagination>
	  		</div>
	  	</div>
	  	<sections-common-table [headers]="this.headers" [data]="this.data"></sections-common-table>
  	</app-base-section>
  `,
  styleUrls: ['./../scss/common.scss']
})
export class EventDataComponent implements ISection {
	public title = 'section.dayplanner';
	public tabs = ['all','actual', 'old'];
	public data = [

	];
	public headers = ['title', 'room', 'guest', 'date-from', 'date-to'];
}
