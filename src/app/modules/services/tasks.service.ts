import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TasksService extends APIService {

	constructor(private http: HttpClient) {
		super();
	}

	public getTasks(f: Object /* filter */) {
		return this.http.get(this.baseUrl + 'tasks/?'+this.xsrf()+'&from='+f['from']+'&to='+f['to']+'&responsible='+f['responsible']+'&creator='+f['creator']+'&title='+f['title']+'&status='+f['status']+'&page=1&' + this.time(), this.options)
	}

	public createTask(task: Object): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const postData = JSON.stringify(task);

			this.http.post(this.baseUrl + 'tasks/?'+this.xsrf(), postData, this.options).subscribe((data: any) => {
				resolve(true);
			});
		});
	}

	public updateTask(taskId: string, task: Object): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const postData = JSON.stringify(task);

			this.http.put(this.baseUrl + 'tasks/'+taskId+'?'+this.xsrf(), postData, this.options).subscribe((data: any) => {
				resolve(true);
			});
		});
	}
}