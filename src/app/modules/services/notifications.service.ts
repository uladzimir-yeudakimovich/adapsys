import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NotificationsService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getNotifications(filter: Object) {
		return this.http.get(this.baseUrl + 'notifications/?'+this.xsrf()+'&page=1&from='+filter['date_from']+'&to='+filter['date_to']+'&' + this.time(), this.options)
	}

	public createNotification(notification: Object): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const postData = JSON.stringify(notification);

			this.http.post(this.baseUrl + 'notifications/?'+this.xsrf(), postData, this.options).subscribe((data: any) => {
				resolve(true);
			});
		});
	}
}