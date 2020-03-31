import { Component, OnInit } from '@angular/core';
import { GuestsService } from '../../../services/guests.service';

@Component({
  selector: 'app-guests-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})

export class GuestsTypesComponent implements OnInit {

	public data = [];

	public model = {
		name: ''
	}

	private update(): void {
		this.guestsService.getTypes().subscribe(
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

	ngOnInit(){
		this.update();
	}

	public createType(): void {
		this.guestsService.createType(this.model.name).subscribe(
			(data: any) => {
				this.model.name = '';
				this.update();
			},
			err => console.error(err),
		);
	}

	constructor(private guestsService: GuestsService){}
}
