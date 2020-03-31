import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SessionHolder } from './session.holder';

import { APIService } from '../abstract/api.service';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class SessionService extends APIService {

	onInit(): Promise<boolean> {
		return new Promise((resolve, reject) => {

				this.http.get(this.baseUrl + 'session_info/', this.options).subscribe(
					(data: Object) => {

						if(data.hasOwnProperty('user_info')){

							this.session.setUserInfo(data['user_info']);
							this.session.setHotelInfo(data['hotel_info']);
							resolve(true);
						} else {
							resolve(false);
						}
					},
					// err => window.location.href = 'http://local.adapsys.com:8002/login'
				);
		});
	}

	public logout(): void {
		this.cookies.deleteAll();
		// window.location.href = 'http://local.adapsys.com:8002/login';
	}


	constructor(
		private http: HttpClient, 
		private session: SessionHolder, 
		private cookies: CookieService){ super() }
}