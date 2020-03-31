import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RoomsService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getRooms(filter: Object) {
		return this.http.get(this.baseUrl + 'roomEntities/?&n_from='+filter['n_from']+'&n_to='+filter['n_to']+'&type_id='+filter['type_id']+'&'+this.xsrf()+'&' + this.time(), this.options)
	}

	public getRoom(roomId: string) {
		return this.http.get(this.baseUrl + 'roomEntities/'+roomId+'?'+this.xsrf()+'&' + this.time(), this.options)
	}

	public getRoomTypes() {
		return this.http.get(this.baseUrl + 'roomTypes/?'+this.xsrf()+'&' + this.time(), this.options)
	}

	public getRoomsFeed() {
		return this.http.get(this.baseUrl + 'rooms-feed/?'+this.xsrf()+'&' + this.time(), this.options)
	}

	public createRoom(room: Object): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const postData = JSON.stringify(room);

			this.http.post(this.baseUrl + 'roomEntities/?'+this.xsrf(), postData, this.options).subscribe((data: any) => {
				resolve(true);
			});
		});
	}

	public updateRoom(roomId: string, room: Object): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const postData = JSON.stringify(room);

			this.http.put(this.baseUrl + 'roomEntities/'+roomId+'?'+this.xsrf(), postData, this.options).subscribe((data: any) => {
				resolve(true);
			});
		});
	}
}