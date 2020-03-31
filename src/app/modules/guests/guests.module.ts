import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { RoutingGuestsModule } from './routing-guests.module';

import { HelpersModule } from '../helpers/helpers.module';
import { ElementsModule } from '../elements/elements.module';

import { GuestsBaseComponent } from './components/base/base.component';
import { GuestsListComponent } from './components/list/list.component';
import { GuestsTypesComponent } from './components/types/types.component';
import { GuestsReferralsComponent } from './components/referrals/referrals.component';

import { GuestsBalanceModalComponent } from './components/balance-modal/balance-modal.component';
import { GuestsEditModalComponent } from './components/edit-modal/edit-modal.component';
import { GuestsDetailsModalComponent } from './components/details-modal/details-modal.component';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    GuestsBaseComponent,
    GuestsListComponent,
    GuestsTypesComponent,
    GuestsReferralsComponent,
    GuestsBalanceModalComponent,
    GuestsEditModalComponent,
    GuestsDetailsModalComponent
  ],
  imports: [
    CommonModule,
    HelpersModule,
    ElementsModule,
    RoutingGuestsModule,
    FormsModule,
    TranslateModule,
    NgbModule.forRoot()
  ],
  exports: [

  ],
  providers: [],
})
export class GuestsModule { }
