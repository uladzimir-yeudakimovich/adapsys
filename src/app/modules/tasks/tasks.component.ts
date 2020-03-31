import { Component, OnInit, ViewChild } from '@angular/core';
import { ISection } from '../../interfaces/interfaces';
import { TasksEditModalComponent } from './components/tasks-edit-modal/tasks-edit-modal.component';

import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-section-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksSectionComponent implements ISection, OnInit {

	@ViewChild('modal') modal: TasksEditModalComponent;

	public title = "section.tasks"

	public data: Array<Object> = [];
	public filter = {
		responsible: '',
		creator: '',
		title: '',
		status: '',
		from: '',
		to: ''
	}

	public updateTasks(): void {
		this.tasksService.getTasks(this.filter).subscribe(
			(data: Array<Object>) => {
				this.data.splice(0, this.data.length);

				for(let i = 0; i < data.length; i++){
					if(!data[i].hasOwnProperty('current_page')){
						this.data.push(data[i]);
					}
				}

				console.log(this.data);
			},
			err => console.error(err),
		);
	}

	public apply(obj: Object): void {
		for(let key in obj){
			this.filter[key] = obj[key];
		}

		this.updateTasks();
	}

	public showEditModal(task: Object): void {
		this.modal.open(task);
	}

	public showAddModal(): void {
		this.modal.open();
	}

	ngOnInit(){
		this.updateTasks();
	}

	constructor(private tasksService: TasksService){}
}
