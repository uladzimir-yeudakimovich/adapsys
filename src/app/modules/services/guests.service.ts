import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GuestsService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getTypes() {
		return this.http.get(this.baseUrl + 'guestTypes/?'+this.xsrf()+'&' + this.time(), this.options)
	}

	public createType(type: string) {
		return this.http.post(this.baseUrl + 'guestTypes/?'+this.xsrf()+'&' + this.time(), JSON.stringify({name: type}), this.options)
	}

	public getReferrals() {
		return this.http.get(this.baseUrl + 'guestReferrals/?' + this.xsrf() + '&' + this.time(), this.options);
	}

	public createGuest(guest: Object): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const postData = JSON.stringify(guest);

			this.http.post(this.baseUrl + 'guests/?'+this.xsrf(), postData, this.options).subscribe((data: any) => {
				resolve(true);
			});
		});
	}

	public updateGuest(guestId: string, guest: Object): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const postData = JSON.stringify(guest);
			
			this.http.put(this.baseUrl + 'guests/'+guestId+'?'+this.xsrf(), postData, this.options).subscribe((data: any) => {
				resolve(true);
			});
		});
	}

	public createReferral(name: string, code: string) {
		const data = JSON.stringify({name: name, code: code});
		return this.http.post(this.baseUrl + 'guestReferrals/?'+this.xsrf()+'&' + this.time(), data, this.options)
	}

	public getGuests() {
		return this.http.get(this.baseUrl + 'guests/?'+this.xsrf()+'&' + this.time(), this.options)
	}

	public getGuestsByRoom(room: string) {
		return this.http.get(this.baseUrl + 'guests-feed/'+room+'?'+this.xsrf()+'&' + this.time(), this.options);
	}

	public refillBalance(guestId: string, amount: number): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const body = new HttpParams().set('amount', ''+amount);
			const options = Object.assign({}, this.options);
			options['headers'] = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
			
			this.http.post(this.baseUrl + 'guest-balance/'+guestId+'?'+this.xsrf(), body.toString(), options).subscribe((data: any) => {
				resolve(true);
			});
		});
	}
}