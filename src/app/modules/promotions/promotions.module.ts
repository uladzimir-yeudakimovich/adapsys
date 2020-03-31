import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { PromotionsSectionComponent } from './promotions.component';
import { PromotionsNewModalComponent } from './components/new-modal/new-modal';
import { PromotionsDetailsModalComponent } from './components/details-modal/details-modal';
import { PromotionsSendModalComponent } from './components/send-modal/send-modal';

import { HelpersModule } from '../helpers/helpers.module';
import { ElementsModule } from '../elements/elements.module';
import { TranslateModule } from '@ngx-translate/core';

export {
  PromotionsSectionComponent,
};

@NgModule({
  declarations: [
    PromotionsSectionComponent,
    PromotionsNewModalComponent,
    PromotionsDetailsModalComponent,
    PromotionsSendModalComponent
  ],
  imports: [
    CommonModule,
    HelpersModule,
    ElementsModule,
    FormsModule,
    NgbModule.forRoot(),
    TranslateModule
  ],
  exports: [
    PromotionsSectionComponent
  ],
  providers: []
})
export class PromotionsModule { }
