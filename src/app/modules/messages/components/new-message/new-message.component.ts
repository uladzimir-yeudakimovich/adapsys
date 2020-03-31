import { Component } from '@angular/core';
import { DialogsService } from '../../../services/dialogs.service';
import { ContactsService } from '../../../services/contacts.service';
import { ObjectsService } from '../../../services/objects.service';
import { GuestsService } from '../../../services/guests.service';
import { IPlace, IContact } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-messages-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class MessagesNewMessageComponent {

	public model = {
		message: '',
		contact: '',
		room: '',
		guest: '',
		place: ''
	}

	public contacts: Array<IContact> = [];
	public places: Array<IPlace> = [];
	public guests: Array<Object> = [];

	public getGuests(): void {
		this.guests.splice(0, this.guests.length);

		if(this.model.room.length > 0){
			this.guestsService.getGuestsByRoom(this.model.room).subscribe(
				(data: Array<Object>) => {
					this.guests.push(...data);
				}, (err) => {
					console.error(err);
				}
			);
		}
	}

	public createDialog(): void {
		const model = this.model;
		this.dialogsService.createDialog(model.message, model.contact, model.room, model.guest, model.place).then((status: boolean) => {
			this.model.message = '';
			this.model.contact = '';
			this.model.room = '';
			this.model.guest = '';
			this.model.place = '';
		});
	}

	constructor(private dialogsService: DialogsService, private guestsService: GuestsService, private objectsService: ObjectsService, private contactsService: ContactsService){
		this.contactsService.getContacts().subscribe(
			(data: Array<IContact>) => {

				this.contacts.splice(0, this.contacts.length);
				this.contacts.push(...data);

			}, (err) => {
				console.error(err);
			}
		);

		this.objectsService.getObjects().subscribe(
			(data: Array<IPlace>) => {

				this.places.splice(0, this.places.length);
				this.places.push(...data);

			}, (err) => {
				console.error(err);
			}
		);
	}
}
