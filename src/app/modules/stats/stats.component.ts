import { Component, OnInit } from '@angular/core';
import { ISection } from '../../interfaces/interfaces';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-section-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsSectionComponent implements ISection, OnInit {
	public title = "section.stats";
	public stats = {};

	constructor(private statsService: StatsService){}

	ngOnInit(){
		this.statsService.getStats().subscribe(
			(data: Object) => {

				for(let key in data){
					this.stats[key] = data[key];
				}
				
			},
			err => console.error(err),
		);
	}
}
