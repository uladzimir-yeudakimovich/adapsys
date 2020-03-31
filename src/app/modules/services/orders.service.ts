import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OrdersService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getOrders(filter: Object) {
		return this.http.get(this.baseUrl + 'orders/?'+this.xsrf()+'&page=1&room='+filter['room']+'&from='+filter['date_from']+'&to='+filter['date_to']+'&status='+filter['tab']+'&' + this.time(), this.options)
	}

	public updateOrder(orderId: string, order: Object): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const url = this.baseUrl + 'orders/'+orderId+'?'+this.xsrf()+'&' + this.time();
			const postData = JSON.stringify(order);

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