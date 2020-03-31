import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RoomsSectionComponent } from './components/rooms.component';
import { RoomsEditModalComponent } from './components/edit-room-modal/edit-room-modal.component';

import { HelpersModule } from '../helpers/helpers.module';
import { ElementsModule } from '../elements/elements.module';

import { TranslateModule } from '@ngx-translate/core';

export {
  RoomsSectionComponent
};

@NgModule({
  declarations: [
    RoomsSectionComponent,
    RoomsEditModalComponent
  ],
  imports: [
    CommonModule,
    HelpersModule,
    ElementsModule,
    FormsModule,
    TranslateModule,
    NgbModule.forRoot()
  ],
  exports: [
    RoomsSectionComponent
  ],
  providers: []
})
export class RoomsModule { }
