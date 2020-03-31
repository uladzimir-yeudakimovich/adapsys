import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ContactsService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getContacts() {
		return this.http.get(this.baseUrl + 'contacts-feed/?'+this.xsrf()+'&' + this.time(), this.options)
	}
}