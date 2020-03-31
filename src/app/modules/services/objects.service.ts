import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ObjectsService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getObjects() {
		return this.http.get(this.baseUrl + 'objects_feed/?'+this.xsrf()+'&' + this.time(), this.options)
	}
}