import { Component, Input } from '@angular/core';
import { DialogsService } from '../../../services/dialogs.service';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

	@Input() data: Object = {};
	@Input('isChild') is_child: boolean = false; 

	constructor(private dialogsService: DialogsService){

	}

    public Message = {
        sUnread: function() {
            if (this.data['sender'].en === 'reception') {
                var usersRead = this.get('users_read');
                if (usersRead) {
                    return usersRead.indexOf(this.data['sender'].en) === -1;
                }
            }
            return false;
        },
        getPrimaryText: function() {
            var senderType = this.get('senderType');
            var primaryText;
            var secondaryText;
            if (senderType && senderType.toUpperCase() !== 'GUEST') {
                primaryText = this.get('body').trim();
                secondaryText = this.get('body_transtaled');
            }
            else {
                primaryText = this.get('body_transtaled');
                secondaryText = this.get('body');
            }
            if (primaryText) {
                return primaryText;
            }
            return secondaryText;
        },
        getSecondaryText: function() {
            var senderType = this.get('senderType');
            var primaryText;
            var secondaryText;
            if (senderType && senderType.toUpperCase() !== 'GUEST') {
                primaryText = this.get('body');
                secondaryText = this.get('body_transtaled');
            }
            else {
                primaryText = this.get('body_transtaled');
                secondaryText = this.get('body');
            }
            if (primaryText && secondaryText && secondaryText.trim() !== primaryText.trim()) {
                return secondaryText;
            }
            return '';
        }
    };

	private getMessage(messageId: number): Object {
        console.log(this.Message);
		return this.dialogsService.getMessage(this.data['dialogID'], messageId);
	}
}
