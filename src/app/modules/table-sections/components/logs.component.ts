import { Component, OnInit } from '@angular/core';
import { ISection } from '../../../interfaces/interfaces';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-logs',
  template: `
  	<app-base-section [title]="this.title">
  		<div class="row">
			<div class="col-md-2">
				<div class="form-group">
					<label for="date_from">{{'field.referral' | translate}}</label>
					<input type="text" class="form-control" [(ngModel)]="this.filter.referral" placeholder="">
				</div>
			</div>
			<div class="col-md-2">
				<div class="form-group">
					<label for="date_to">{{'field.guest' | translate}}</label>
					<input type="text" class="form-control" [(ngModel)]="this.filter.guest" placeholder="">
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<label for="search">{{'field.room' | translate}}</label>
					<input type="text" class="form-control" [(ngModel)]="this.filter.room"  placeholder="E.g. room number">
				</div>
			</div>
			<div class="col-md-4 pt-4">
				<button (click)="this.apply()" class="btn btn-primary mt-2 ml-2">{{'button.filter' | translate}}</button>
				<button (click)="this.reset()" class="btn btn-reset mt-2 ml-2">{{'button.reset' | translate}}</button>
			</div>
		</div>
	  	<sections-common-table [headers]="this.headers" [data]="this.data"></sections-common-table>
			<pagination
	  				[count]="this.data.length"
	  				[perPage]="10"
	  				(change)="this.setPage"
	  		></pagination>
  	</app-base-section>
  `,
  styleUrls: ['./../scss/common.scss']
})
export class LogsSectionComponent implements ISection, OnInit {
	public title = 'section.logs';
	public data = [

	];
	public headers = ['date', 'reason', 'action', 'room', 'guest', 'referral-code'];

	private filter = {
		referral: '',
		guest: '',
		room: ''
	}

	public reset(): void {
		this.filter.referral = '';
		this.filter.guest = '';
		this.filter.room = '';
	}

	public apply(): void {
		this.updateLogs();
	}

	public updateLogs(): void {
		this.logsService.getLogs(this.filter.referral, this.filter.guest, this.filter.room).subscribe(
			(data: Array<Object>) => {
				this.data.splice(0, this.data.length);

				for(let i = 0; i < data.length; i++){
					if(data[i].hasOwnProperty('current_page')){
						continue;
					}
					
					this.data.push({
						cols:[
							data[i]['date'],
							data[i]["reason"],
							data[i]["action"],
							data[i]["room"],
							data[i]["guest"],
							data[i]["referral_name"] + "/" + data[i]["referral_code"]
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
		this.updateLogs();
	}

	constructor(private logsService: LogsService){}
}
