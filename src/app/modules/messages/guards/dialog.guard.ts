import { Injectable } from '@angular/core';
import { DialogsService } from '../../services/dialogs.service';
import { IDialogInternal } from '../../../interfaces/interfaces';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class DialogGuard implements CanActivate {

    constructor(private router: Router, private dialogsService: DialogsService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

        return new Promise((resolve) => {

            console.log(route, state);
            resolve(true);

            this.dialogsService.getDialogs().then((dialogs: Array<IDialogInternal>) => {
                let dialogId = state.url.match(/\/messages\/(.*)/);
                if(dialogId == null || dialogId[1].length == 0){
                    if(dialogs.length > 0){
                        this.router.navigate(['/messages/' + dialogs[0]['ID']]);
                    } else {
                        this.router.navigate(['/messages/new']);
                    }
                }
            });

        });
    }
}
