import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StatsService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getStats() {
		return this.http.get(this.baseUrl + 'stats/?lang=&date_from=&date_to=&ipp=10&sort=value&'+this.xsrf()+'&' + this.time(), this.options)
	}
}