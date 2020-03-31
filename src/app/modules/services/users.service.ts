import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getAllUsers() {
		return this.http.get(this.baseUrl + 'all_users/?' + this.xsrf() + '&' + this.time(), this.options);
	}
}