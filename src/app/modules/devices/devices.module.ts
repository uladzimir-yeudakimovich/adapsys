import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { DevicesSectionComponent } from './components/devices.component';
import { DevicesFilterComponent } from './components/devices-filter/devices-filter.component';
import { DevicesModalComponent } from './components/devices-modal/devices-modal.component';
import { DevicesDetailsModalComponent } from './components/devices-details-modal/devices-details-modal.component';

import { HelpersModule } from '../helpers/helpers.module';
import { ElementsModule } from '../elements/elements.module';

import { TranslateModule } from '@ngx-translate/core';

export {
  DevicesSectionComponent
};

@NgModule({
  declarations: [
    DevicesSectionComponent,
    DevicesFilterComponent,
    DevicesModalComponent,
    DevicesDetailsModalComponent
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
    DevicesSectionComponent
  ],
  providers: [NgbActiveModal]
})
export class DevicesModule { }
