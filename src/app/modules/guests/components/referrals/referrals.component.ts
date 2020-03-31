import { Component, OnInit } from '@angular/core';
import { GuestsService } from '../../../services/guests.service';

@Component({
  selector: 'app-guests-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})

export class GuestsReferralsComponent {
	public data = [];

	public model = {
		name: '',
		code: ''
	}

	private update(): void {
		this.guestsService.getReferrals().subscribe(
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

	public createReferral(): void {
		this.guestsService.createReferral(this.model.name, this.model.code).subscribe(
			(data: any) => {
				this.model.name = '';
				this.model.code = '';
				this.update();
			},
			err => console.error(err),
		);
	}

	constructor(private guestsService: GuestsService){}
}
