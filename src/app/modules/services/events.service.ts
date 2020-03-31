import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EventsService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getEventsCount() {
		return this.http.get(this.baseUrl + 'eventsCount/?'+this.xsrf()+'&' + this.time(), this.options)
	}
}