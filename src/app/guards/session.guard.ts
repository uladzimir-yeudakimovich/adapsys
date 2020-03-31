import { Injectable } from '@angular/core';
import { SessionService } from '../modules/services/session.service';
import { SectionsService } from '../modules/services/sections.service';
import { LanguagesService } from '../modules/services/languages.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class SessionGuard implements CanActivate {

    constructor(private router: Router,
                private session: SessionService,
                private sections: SectionsService,
                private languages: LanguagesService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        console.info('Angular Guard: Authorization check for access');

        return new Promise((resolve) => {

            this.session.onInit().then((isAuth: boolean) => {
                if(isAuth){
                    this.languages.updateLanguages().then((status: boolean) => {

                        if(status){
                            this.sections.onInit().then((tabs: Array<Object>) => {
                                resolve(isAuth);

                                if(state.url == '/') {
                                    this.router.navigate([tabs[0]['url']]);
                                }
                            });
                        } else {
                            resolve(false);
                        }
                        
                    });
                } else {
                    this.session.logout();
                    resolve(false);
                }
            });

        });
    }
}
