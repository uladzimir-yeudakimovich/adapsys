import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CleanRequestsService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getRequests(filter: Object) {
		return this.http.get(this.baseUrl + 'cleanRequests/?'+this.xsrf()+'&page=1&room='+filter['room']+'&from='+filter['date_from']+'&to='+filter['date_to']+'&status='+filter['tab']+'&' + this.time(), this.options)
	}

	public updateRequest(requestId: string, request: Object): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const url = this.baseUrl + 'cleanRequests/'+requestId+'?'+this.xsrf()+'&' + this.time();
			const postData = JSON.stringify(request);

			this.http.put(url, postData, this.options).subscribe((data: Object) => {
					resolve( true );
				}, (err) => {
					resolve( false );
					console.error(err);
				}
			);
		})
	}
}