import { Injectable } from '@angular/core';
import { APIService } from '../abstract/api.service';
import { IDialogInternal, IDialogExternal, IDialogMessage } from '../../interfaces/interfaces';
import { MultilangPipe } from '../helpers/pipes/multilang.pipe';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DialogsService extends APIService {

	private dialogs: Array<IDialogInternal> = [];
	private messages = {};

	public onDialogsChanges = new Subject<void>();

	private updateDialogs(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const url = this.baseUrl + 'messageGroups/?'+this.xsrf()+'&page=1&date_from=&date_to=&search_in_arhcive=false&text=&' + this.time();
			this.http.get(url, this.options).subscribe(
				(data: Array<IDialogExternal>) => {

					this.dialogs.splice(0, this.dialogs.length);
					for(let dialog of data){
						const newDialog: IDialogInternal = {
							room: '',
							ID: dialog._id,
							name: dialog.name
						};

						const name = this.multilangPipe.transform(dialog.name, []);
						const roomId = name.match(/\(([\d]+)\)/);
						newDialog.room = roomId[1];

						this.dialogs.push(newDialog);
						this.messages[dialog._id] = [];
					}

					resolve( true );
				}, (err) => {
					resolve( false );
					console.error(err);
				}
			);
		})
	}

	private updateMessages(dialogId: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const url = this.baseUrl + 'messages/?'+this.xsrf()+'&group_id='+dialogId+'&' + this.time();
			this.http.get(url, this.options).subscribe(
				(data: Array<IDialogMessage>) => {

					this.messages[dialogId].splice(0, this.messages[dialogId].length);
					for(let message of data){
						const newMessage = {
							sender: message.sender,
							message: message.body,
							date: message.date,
							id: message._id,
							dialogID: dialogId
						};

						if(message.hasOwnProperty('reply_to')){
							newMessage['replyId'] = message.reply_to;
						}

						this.messages[dialogId].push(newMessage);
					}

					resolve( true );
				}, (err) => {
					resolve( false );
					console.error(err);
				}
			);
		})
	}

	public sendMessage(message:string, dialogID: string, contactId: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const url = this.baseUrl + 'messages/?'+this.xsrf()+'&' + this.time();
			const postData = JSON.stringify({
				body: message,
				contact: contactId,
				group: dialogID,
				head: "No subject",
				media: [],
				place_id: '',
				silent_mode: false
			});

			this.http.post(url, postData, this.options).subscribe(
				(data: Object) => {

					if(data.hasOwnProperty('result') && data['result'] == 'ok'){
						this.updateMessages(dialogID).then(() => {
							resolve(true);
						})

					} else {
						resolve(false);
					}

				}, (err) => {
					resolve( false );
					console.error(err);
				}
			);
		})
	}

	public createDialog(message: string, contactId: string, roomNumber: string, guestId: string, placeId: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const url = this.baseUrl + 'messages/?'+this.xsrf()+'&' + this.time();
			const postData = JSON.stringify({
				body: message,
				contact: contactId,
				head: "No subject",
				media: [],
				guest: (guestId ? guestId : ''),
				place_id: placeId,
				silent_mode: false
			});

			this.http.post(url, postData, this.options).subscribe(
				(data: Object) => {

					if(data.hasOwnProperty('result') && data['result'] == 'ok'){
						this.updateDialogs().then(() => {
							this.onDialogsChanges.next();
							resolve(true);
						})

					} else {
						resolve(false);
					}

				}, (err) => {
					resolve( false );
					console.error(err);
				}
			);
		})
	}

	public getDialogs(): Promise<Array<IDialogInternal>> {
		return new Promise((resolve, reject) => {
			if(this.dialogs.length > 0){
				resolve(this.dialogs);
			} else {
				this.updateDialogs().then((status: boolean) => {
					resolve(this.dialogs);
				});
			}
		});
	}

	public getMessages(dialogID: string, reset = false): Promise<Array<Object>> {
		return new Promise((resolve, reject) => {
			if(this.messages[dialogID].length > 0 && !reset){
				resolve(this.messages[dialogID]);
			} else {
				this.updateMessages(dialogID).then((status: boolean) => {
					resolve(this.messages[dialogID]);
				});
			}
		});
	}


	//Should work using cache
	public getMessage(dialogID: string, messageID: number): Object {

		if(this.messages.hasOwnProperty(dialogID)){
			for(let entity of this.messages[dialogID]){
				if(entity['id'] == messageID){
					return entity;
				}
			}
		}

		return {};
	}

	constructor(private http: HttpClient, private multilangPipe: MultilangPipe) {
		super();
	}
}