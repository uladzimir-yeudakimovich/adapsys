import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { LanguagesService } from '../../../services/languages.service';

@Component({
  selector: 'multilang-form',
  templateUrl: './multilang-form.component.html',
  styleUrls: ['./multilang-form.component.scss']
})
export class MultilangFormComponent implements OnInit {

	@Input('form') form: Array<Object> = [];
	@Input('data') set setData(data: Object) {
		this.data = data;

		this.tabs.splice(0, this.tabs.length);
		for(let lang in this.data){
			this.tabs.push(lang);
		}
	}

	@Output('dataChange') onChange: EventEmitter<Object> = new EventEmitter<Object>();

	constructor(private languagesService: LanguagesService){}

	ngOnInit(){
		this.availableLanguages = this.languagesService.getLanguages(true);

		if(this.tabs.length == 0){
			const lang = this.languagesService.getDefaultLanguage();
			this.addLanguage(lang);
		}
	}

	public data = {};
	public availableLanguages = {};
	public tabs: Array<string> = [];

	public addLanguage(lang: string): void {
		this.data[lang] = this.createModel();
		this.tabs.push(lang);

		this.onChange.emit(this.data);
	}

	public isTabExists(lang: string): boolean {
		return this.tabs.includes(lang);
	}

	public isTabsDropdownEmpty(): boolean {
		return this.tabs.length == Object.keys(this.availableLanguages).length;
	}

	public fieldChanged(): void {
		this.onChange.emit(this.data);
	}

	private createModel(): Object {
		const model = {};

		for(let field of this.form){
			model[field['name']] = "";
		}

		return model;
	}

	public beforeTabChange($event: NgbTabChangeEvent) {
      if ($event.nextId === 'tab-plus-lang') {
        $event.preventDefault();
      }
    };
}
