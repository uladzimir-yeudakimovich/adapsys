import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguagesService } from '../../modules/services/languages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-langswitcher',
  templateUrl: './langswitcher.component.html',
  styleUrls: ['./langswitcher.component.scss']
})

export class LangSwitcherComponent implements OnInit, OnDestroy {
	public languages: Array<string> = [];
	public currentLanguage: string;

	private sub: Subscription;
	
	constructor(private languagesService: LanguagesService){
		this.languages.push(...this.languagesService.getInterfaceLanguages());
		this.currentLanguage = this.languagesService.getUserLanguage();
	}

	public setLanguage(lang: string){
		this.languagesService.setUserLanguage(lang);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	ngOnInit() {
		this.sub = this.languagesService.onInterfaceLanguageChanged.subscribe((newLang: string) => {
			this.currentLanguage = newLang;
		});
	}
}
