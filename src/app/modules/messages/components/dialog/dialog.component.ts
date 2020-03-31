import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogsService } from '../../../services/dialogs.service';
import { ContactsService } from '../../../services/contacts.service';
import { ObjectsService } from '../../../services/objects.service';
import { IPlace } from '../../../../interfaces/interfaces';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-messages-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  host: {
  	'(window:resize)': 'onWindowResize($event)'
  }
})
export class MessagesDialogComponent implements OnInit, OnDestroy, AfterViewChecked {

	@ViewChild('messagesWrap') private messagesWrap: ElementRef;

	private sub: Subscription;
	private subTimer: Subscription;

	private previousScrollPosition = 0;
	private autoScrollDenied = false;

	private currentDialog = {
		ID: '',
		name: '',
		room: ''
	};

	public model = {
		message: '',
		contact: ''
	}

	public contacts: Array<Object> = [];
	public places: Array<IPlace> = [];

	public messages: Array<Object> = [];

	constructor(private dialogsService: DialogsService, private objectsService: ObjectsService, private contactsService: ContactsService, private router: Router, private route: ActivatedRoute){
		this.contactsService.getContacts().subscribe(
			(data: Array<Object>) => {

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

	private scrollToBottom(): void {

		if(this.autoScrollDenied){
			return;
		}

        try {
        	const wrap = this.messagesWrap.nativeElement;
        	const wrapScrollHeight = wrap.scrollHeight - wrap.clientHeight;

        	if(wrap.scrollTop < wrapScrollHeight){
        		wrap.scrollTop = wrapScrollHeight;
        	}
        } catch(err) { }  
	}

	private onScroll() {
        const wrap = this.messagesWrap.nativeElement;
        const wrapScrollHeight = wrap.scrollHeight - wrap.clientHeight;

		if(this.previousScrollPosition && wrap.scrollTop < this.previousScrollPosition){
			this.autoScrollDenied = true;
		} else if(wrapScrollHeight-20 <= wrap.scrollTop) {
			this.autoScrollDenied = false;
		}

		this.previousScrollPosition = wrap.scrollTop;
	}

	private resizeMessagesWrap(): void {
		const dialogWrapRect = this.messagesWrap.nativeElement.getBoundingClientRect();
		const dialogFormRect = document.querySelector('#message-form').getBoundingClientRect();
		const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		const height = windowHeight - dialogWrapRect.top - dialogFormRect.height - 50;

		if(height > 100){
			this.messagesWrap.nativeElement.style.height = height + 'px';
		}
	}

	public sendMessage(): void {
		if (this.contacts.length === 1) {
			this.model.contact = this.contacts[0]['name'];
		}
        if (this.contacts.length !== 1 && this.model.contact === '') {
            document.getElementById('detailsContact').style.border = 'solid red';
        } else if (this.contacts.length !== 1 && this.model.contact !== '') {
        	document.getElementById('detailsContact').style.border = '';
        }
		this.dialogsService.sendMessage(this.model.message, this.currentDialog.ID, this.model.contact).then((status: boolean) => {
			this.model.message = '';
			this.updateMessages();
		});
	}

	public onWindowResize($event): void {
		this.resizeMessagesWrap();
	}

	private getLastMessageId(): string {
		if(this.messages.length > 0){
			return this.messages[this.messages.length -1]['id'];
		}

		return '';
	}

	private updateMessages(reset = false): void {
		const lastMessageId = this.getLastMessageId();

		this.dialogsService.getMessages(this.currentDialog['ID'], reset).then((messages: Array<Object>) => {
			this.messages.splice(0, this.messages.length);
			this.messages.push(...messages);

			if(lastMessageId != this.getLastMessageId()){
				this.scrollToBottom();
				this.resizeMessagesWrap();
			}
		});
	}

	ngAfterViewChecked(){
		this.scrollToBottom();
	}

	ngOnInit(){
	    this.sub = this.route.params.subscribe(params => {
	    	const dialogID = params['id'];
		    this.currentDialog['ID'] = dialogID;

			this.dialogsService.getDialogs().then((dialogs: Array<Object>) => {
				for(let dialog of dialogs){
					if(dialog['ID'] == dialogID){
						this.currentDialog['name'] = dialog['name'];
						this.currentDialog['room'] = dialog['room'];

						this.updateMessages();

						return;
					}
				}
			});
	    });

	    this.subTimer = timer(5000, 5000).subscribe(() => {
	    	this.updateMessages(true);
	    });

	    this.scrollToBottom();
	    this.resizeMessagesWrap();
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
		this.subTimer.unsubscribe();
	}
}
