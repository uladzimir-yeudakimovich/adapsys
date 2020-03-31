import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LanguagesService } from '../../../services/languages.service';

@Component({
  selector: 'app-stats-filter',
  templateUrl: './stats-filter.component.html',
  styleUrls: ['./stats-filter.component.scss']
})

export class StatsFilterComponent implements OnInit {

	@Output('onApply') onApply:EventEmitter<Object> = new EventEmitter<Object>();

	public languages: Object = {};
	public model = {
		date_from: '',
		date_to: '',
		ipp: '',
		sort: '',
		language: ''
	}

	constructor(private languagesService: LanguagesService){}

	ngOnInit(){
		this.languages = this.languagesService.getLanguages();
	}

	public apply(): void {

	}
}
