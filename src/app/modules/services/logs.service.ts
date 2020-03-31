import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LogsService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getLogs(referral: string, name: string, room: string) {

		const options =  { 
        	withCredentials: true
    	};

		return this.http.get(this.baseUrl + 'checkin_history/?'+this.xsrf()+'&referral='+referral+'&name='+name+'&room='+room+'&_='+(new Date).getTime(), options)
	}
}