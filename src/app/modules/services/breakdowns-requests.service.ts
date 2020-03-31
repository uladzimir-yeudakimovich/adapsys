import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BreakdownsRequestsService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getRequests(filter: Object) {
		return this.http.get(this.baseUrl + 'eqMalRequests/?'+this.xsrf()+'&page=1&room='+filter['room']+'&from='+filter['date_from']+'&to='+filter['date_to']+'&status='+filter['tab']+'&' + this.time(), this.options)
	}
}