import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentsService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getPayments() {
		return this.http.get(this.baseUrl + 'payments/?'+this.xsrf()+'&page=1&room=&from=&to=&' + this.time(), this.options)
	}
}