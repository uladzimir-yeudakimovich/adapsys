import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sections-common-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

	@Output('onApply') onApply: EventEmitter<Object> = new EventEmitter<Object>();

	public filterTypes = {
		'today': 'common.today',
		'period': 'common.period'
	}

	public currentState = {
		type: 'today',
		inputDisabled: true,
	}

	public model = {
		date_to: '',
		date_from: '',
		room: ''
	}

	public setFilter(name: string, value: any): void {
		this.currentState[name] = value;

		if(name == 'type'){
			this.currentState['inputDisabled'] = (value == 'today');

			if(value == 'today'){
				const date = new Date();
				let day = date.getDate();
				let month = date.getMonth() + 1;
				let year = date.getFullYear();

				const formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
				this.model.date_from = formattedDate;
				this.model.date_to = formattedDate;
			} else {
				this.model.date_from = '';
				this.model.date_to = '';
			}
		}
	}

	public apply(): void {
		const model = Object.assign({}, this.model);

		for(let key of ['date_to', 'date_from']){
			if((<any> model[key]) instanceof Object){
				model[key] = model[key]['year'] + '-' + model[key]['month'] + '-' + model[key]['day'];
			}
		}

		model['date_from'] += 'T00:00:01.000Z';
		model['date_to'] += 'T23:59:59.000Z';

		this.onApply.emit(model);
	}

	public reset(): void {
		this.model.date_from = '';
		this.model.date_to = '';
		this.model.room = '';

		this.onApply.emit(this.model);
	}
}
