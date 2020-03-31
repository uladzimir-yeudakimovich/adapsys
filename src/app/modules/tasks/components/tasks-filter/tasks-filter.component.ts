import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GuestsService } from '../../../services/guests.service';
import { UsersService } from '../../../services/users.service';
import { IGuest } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-tasks-filter',
  templateUrl: './tasks-filter.component.html',
  styleUrls: ['./tasks-filter.component.scss']
})

export class TasksFilterComponent implements OnInit {

	@Output('onApply') onApply: EventEmitter<Object> = new EventEmitter<Object>();

	public users: Array<Object> = [];
	public guests: Array<IGuest> = [];

	public model = {
		responsible: '',
		creator: '',
		title: '',
		status: '',
		from: '',
		to: ''
	}

	constructor(private usersService: UsersService, private guestsService: GuestsService){}

	ngOnInit(){
		this.usersService.getAllUsers().subscribe((list: Array<Object>) => {
			this.users.splice(0, this.users.length);
			this.users.push(...list);
		});

		this.guestsService.getGuests().subscribe((list: Array<IGuest>) => {
			this.guests.splice(0, this.guests.length);
			this.guests.push(...list);
		});
	}

	public reset(): void {
		for(let key in this.model){
			this.model[key] = '';
		}

		this.onApply.emit(this.model);
	}

	public apply(): void {
		const model = Object.assign({}, this.model);

		for(let key of ['to', 'from']){
			if((<any> model[key]) instanceof Object){
				model[key] = model[key]['year'] + '-' + model[key]['month'] + '-' + model[key]['day'];
			}
		}

		model['from'] += 'T00:00:01.000Z';
		model['to'] += 'T23:59:59.000Z';

		this.onApply.emit(model);
	}
}
