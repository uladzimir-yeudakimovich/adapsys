import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-devices-filter',
  templateUrl: './devices-filter.component.html',
  styleUrls: ['./devices-filter.component.scss']
})
export class DevicesFilterComponent {

	@Output() onApply: EventEmitter<Object> = new EventEmitter<Object>();

	public model = {
		mac: '',
		room: '',
		date: ''
	}

	public reset(): void {
		this.model.mac = '';
		this.model.room = '';
		this.model.date = '';

		this.filter();
	}

	public filter(): void {
		const model = Object.assign({}, this.model);

		if((<any> model.date) instanceof Object){
			model.date = model.date['day'] + '-' + model.date['month'] + '-' + model.date['year'];
		}

		this.onApply.emit(model);
	}

	public today(): void {
		const date = new Date();
		let day = date.getDate();
		let month = date.getMonth() + 1;
		let year = date.getFullYear();

		const formattedDate = (day < 10 ? '0' + day : day) + '-' + (month < 10 ? '0' + month : month) + '-' + year;
		this.model.date = formattedDate;
		this.filter();
	}
}
