import { Component, OnInit, ViewChild } from '@angular/core';
import { ISection } from '../../../interfaces/interfaces';
import { NotificationsService } from '../../services/notifications.service';
import { NotificationsViewModalComponent } from './../modals/notifications-view-modal/notifications-view-modal.component';
import { NotificationsCreateModalComponent } from './../modals/notifications-create-modal/notifications-create-modal.component';

@Component({
  selector: 'app-notifications',
  template: `
  	<app-base-section [title]="this.title">
  		<app-notifications-view-modal #viewModal></app-notifications-view-modal>
  		<app-notifications-create-modal #createModal (onClose)="this.update()"></app-notifications-create-modal>
		<div class="row">
		   <div class="col-md-2">
		      <label for="from">From</label>
		      <input type="text" id="from" ngbDatepicker #df="ngbDatepicker" (click)="df.toggle()" [(ngModel)]="this.filter.date_from" class="form-control">
		      <i class="fa fa-calendar"></i>&nbsp;&nbsp;&nbsp;
		   </div>
		   <div class="col-md-2">
		   		<label for="to">To</label>
				<input type="text" id="to" ngbDatepicker #dt="ngbDatepicker" (click)="dt.toggle()" [(ngModel)]="this.filter.date_to" class="form-control">
				<i class="fa fa-calendar"></i>
		   </div>
		   <div class="col-md-8 mt-4">
		      <button class="btn btn-outline-danger float-right" (click)="this.reset()">{{'button.reset' | translate}}</button>
		      <button class="btn btn-primary mr-1 float-right" (click)="this.apply()">{{'button.filter' | translate}}</button>
		   </div>
		</div>

		<div class="row mb-4">
			<div class="col-md-12">
				<button type="button" class="btn btn-primary" (click)="this.showCreateModal()">{{'notifications.new-notification' | translate}}</button>
			</div>
		</div>

	  	<sections-common-table (onClick)="this.showViewModal($event)" [headers]="this.headers" [data]="this.data"></sections-common-table>
			<pagination
	  				[count]="this.data.length"
	  				[perPage]="10"
	  				(change)="this.setPage"
	  		></pagination>
  	</app-base-section>
  `,
  styleUrls: ['./../scss/common.scss']
})
export class NotificationsSectionComponent implements ISection {
	@ViewChild('viewModal') viewModal: NotificationsViewModalComponent;
	@ViewChild('createModal') createModal: NotificationsCreateModalComponent;

	public title = 'section.notifications';
	public data = [

	];
	public headers = ['date', 'title', 'content'];

	public filter = {
		date_from: '',
		date_to: ''
	}

	public model = {
		date_from: '',
		date_to: ''
	};

	public apply(): void {
		this.model = Object.assign({}, this.filter);

		for(let key of ['date_to', 'date_from']){
			if((<any> this.model[key]) instanceof Object){
				this.model[key] = this.model[key]['year'] + '-' + this.model[key]['month'] + '-' + this.model[key]['day'];
			}
		}

		this.model['date_from'] += 'T00:00:01.000Z';
		this.model['date_to'] += 'T23:59:59.000Z';

		this.update();
	}

	public reset(): void {
		this.filter.date_from = '';
		this.filter.date_to = '';

		this.apply();
	}

	public showViewModal(obj: Object): void {
		this.viewModal.open(obj);
	}

	public showCreateModal(): void {
		this.createModal.open();
	}

	public update(): void {
		this.notificationsService.getNotifications(this.model).subscribe(
			(data: Array<Object>) => {
				this.data.splice(0, this.data.length);

				for(let i = 0; i < data.length; i++){
					if(data[i].hasOwnProperty('current_page')){
						continue;
					}
					
					this.data.push({
						cols:[
							data[i]['date'],
							data[i]['title'],
							data[i]['body']
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
		this.update();
	}

	constructor(private notificationsService: NotificationsService){}
}
