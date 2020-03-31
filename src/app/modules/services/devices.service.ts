import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DevicesService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getDevices(filter: Object) {
		return this.http.get(this.baseUrl + 'devices/?'+this.xsrf()+'&device_mac='+filter['mac']+'&device_room='+filter['room']+'&checkout_date='+filter['date']+'&device_assigned='+filter['assigned']+'&page=1&' + this.time(), this.options)
	}

	public updateDevice(deviceId: string, device: Object): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const url = this.baseUrl + 'devices/'+deviceId+'?'+this.xsrf()+'&' + this.time();
			const postData = JSON.stringify(device);

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