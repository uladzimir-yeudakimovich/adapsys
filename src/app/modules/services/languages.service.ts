import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguagesService extends APIService {

	private available_languages: Array<string> = [];
	private default_language = 'en';
	private user_language = 'en';
	private languages = {};
	private interface_languages = ['en', 'es', 'ru'];

	public onInterfaceLanguageChanged = new Subject<string>();

	constructor(private http: HttpClient, private translateService: TranslateService, private cookies: CookieService) {
		super();
	}

	private getCurrentUserLanguage(): string | undefined {
		const lang = this.cookies.get('lang');
		if(lang && this.interface_languages.includes(lang)){
			return lang;
		}

		return undefined;
	}

	public getLanguages(only_available = false): Object {
		if(only_available){
			const ret = {};

			for(let lang of this.available_languages){
				ret[lang] = this.languages[lang];
			}

			return ret;
		}

		return this.languages;
	}

	public chooseLanguage(languages: Array<string>): string {
		const priorityQueue = [this.user_language, this.default_language, 'en', ...this.available_languages, ...languages];

		for(let lang of priorityQueue){
			if(languages.includes(lang)){
				return lang;
			}
		}
	}

	public getInterfaceLanguages(): Array<string> {
		return this.interface_languages;
	}

	public getUserLanguage(): string {
		return this.user_language;
	}

	public getDefaultLanguage(): string {
		return this.default_language;
	}

	public setUserLanguage(lang: string): boolean {
		if(this.interface_languages.includes(lang)){
			this.user_language = lang;
			this.cookies.set('lang', lang);
			this.translateService.use(lang);
			this.onInterfaceLanguageChanged.next(lang);
		}

		return false;
	}

	public updateLanguages(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.http.get(this.baseUrl + 'languages/', this.options).subscribe(
				(data: Object) => {

					this.available_languages.splice(0, this.available_languages.length);
					this.available_languages.push(...data['available_languages']);

					this.default_language = data['default_language'];
					this.languages = data['languages'];

					const userLanguage = this.getCurrentUserLanguage();
					this.user_language = (userLanguage ? userLanguage : data['user_language']);

					this.translateService.addLangs(this.interface_languages);
					this.translateService.setDefaultLang('en');
					this.translateService.use(this.user_language);

					resolve(true);
				}, ( err ) => {
					resolve(false);

					console.error(err);
				}
			);
		});
	}
}