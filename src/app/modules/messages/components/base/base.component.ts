import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogsService } from '../../../services/dialogs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class MessagesBaseComponent implements OnInit {

	private sub: Subscription;
	private subDialogsChanges: Subscription;

	constructor(private dialogsService: DialogsService, private router: Router, private route: ActivatedRoute){
		this.updateDialogs();
	}

	private dialogs: Array<Object> = [];

	private currentDialog = '';

	public isCurrentDialog(dialogID: string): boolean {
		return this.currentDialog == dialogID;
	}

	public setCurrentDialog(dialogID: string): void {
		this.currentDialog = dialogID;
		this.router.navigate(['/messages/'+dialogID]);
	}

	private updateDialogs(): void {
		this.dialogsService.getDialogs().then((dialogs: Array<Object>) => {
			this.dialogs.splice(0, this.dialogs.length);
			this.dialogs.push(...dialogs);
		});
	}

	ngOnInit(){
	    this.sub = this.route.params.subscribe(params => {
		    this.currentDialog = params['id'];

		    if(!this.currentDialog){
		    	let dialogId = window.location.hash.match(/\/messages\/(.*)/);
                if(dialogId && dialogId[1].length > 0 && dialogId[1] != 'new'){
                	this.currentDialog = dialogId[1];
                }
		    }
	    });

	    this.subDialogsChanges = this.dialogsService.onDialogsChanges.subscribe(() => {
	    	this.updateDialogs();
	    });
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
		this.subDialogsChanges.unsubscribe();
	}
}
