import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PromotionsService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getPromotions() {
		return this.http.get(this.baseUrl + 'promotions/?' + this.xsrf() + '&' + this.time(), this.options);
	}

    // public createPromotions(guest: Object): Promise<boolean> {
    //     return new Promise((resolve, reject) => {
    //         const postData = JSON.stringify(guest);
	//
    //         this.http.post(this.baseUrl + 'guests/?'+this.xsrf(), postData, this.options).subscribe((data: any) => {
    //             resolve(true);
    //         });
    //     });
    // }

	public getDescriptions() {
        return this.http.get(this.baseUrl + 'objects_feed/?' + 'extra_fields%5B%5D=description&extra_fields%5B%5D=media', this.options);
	}

    public createPromotions(Object) {
	    const postData = JSON.stringify(Object);
        return this.http.put(this.baseUrl + 'promotions/?' + this.xsrf() + '&' + this.time(), postData, { withCredentials: true }).subscribe(function (res) {
                console.log(res);
                console.log(postData);
            }, function (err) {
                console.log('error');
                console.log(postData);
            });
    }

	// public updatePromotions(guestId: string, guest: Object): Promise<boolean> {
    //     return new Promise((resolve, reject) => {
    //         const postData = JSON.stringify(guest);
	//
    //         this.http.put(this.baseUrl + 'guests/' + guestId + '?' + this.xsrf(), postData, this.options).subscribe((data: any) => {
    //             resolve(true);
    //         });
    //     });
	// }

}