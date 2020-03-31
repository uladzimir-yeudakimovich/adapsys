import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { CleanRequestsComponent } from './components/clean-requests.component';
import { BreakdownRequestsComponent } from './components/breakdown-requests.component';
import { EventDataComponent } from './components/dataevent.component';
import { PaymentsComponent } from './components/payments.component';
import { ReservationsComponent } from './components/reservations.component';
import { RoomOrdersComponent } from './components/room-orders.component';
import { TaxiRequestsComponent } from './components/taxi-requests.component';
import { WakeupRequestsComponent } from './components/wakeup-requests.component';
import { LogsSectionComponent } from './components/logs.component';
import { NotificationsSectionComponent } from './components/notifications.component';

import { CleanRequestsModalComponent } from './modals/clean-requests-modal/clean-requests-modal.component';
import { NotificationsCreateModalComponent } from './modals/notifications-create-modal/notifications-create-modal.component';
import { NotificationsViewModalComponent } from './modals/notifications-view-modal/notifications-view-modal.component';
import { ReservationsViewModalComponent } from './modals/reservations-view-modal/reservations-view-modal.component';
import { RoomOrdersModalComponent } from './modals/room-orders-modal/room-orders-modal.component';
import { BreakdownsRequestsModalComponent } from './modals/breakdowns-requests-modal/breakdowns-requests-modal.component';
import { TaxiRequestsModalComponent } from './modals/taxi-requests-modal/taxi-requests-modal.component';

import { TableComponent } from './common/table/table.component';
import { TabsComponent } from './common/tabs/tabs.component';
import { FilterComponent } from './common/filter/filter.component';

import { BaseSectionComponent } from './components/base-section.component';

import { HelpersModule } from '../helpers/helpers.module';
import { ElementsModule } from '../elements/elements.module';

import { TranslateModule } from '@ngx-translate/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

export {
  CleanRequestsComponent,
  BaseSectionComponent,
  BreakdownRequestsComponent,
  EventDataComponent,
  PaymentsComponent,
  ReservationsComponent,
  RoomOrdersComponent,
  TaxiRequestsComponent,
  WakeupRequestsComponent,
  LogsSectionComponent,
  NotificationsSectionComponent,
  TaxiRequestsModalComponent
};

@NgModule({
  declarations: [
    CleanRequestsComponent,
    TableComponent,
    TabsComponent,
    FilterComponent,
    BaseSectionComponent,
    BreakdownRequestsComponent,
    EventDataComponent,
    PaymentsComponent,
    ReservationsComponent,
    RoomOrdersComponent,
    TaxiRequestsComponent,
    WakeupRequestsComponent,
    LogsSectionComponent,
    NotificationsSectionComponent,
    CleanRequestsModalComponent,
    NotificationsCreateModalComponent,
    NotificationsViewModalComponent,
    ReservationsViewModalComponent,
    RoomOrdersModalComponent,
    BreakdownsRequestsModalComponent,
    TaxiRequestsModalComponent
  ],
  imports: [
    BrowserModule,
    HelpersModule,
    ElementsModule,
    FormsModule,
    TranslateModule,
    NgbModule,
    LeafletModule
  ],
  exports: [
    CleanRequestsComponent,
    BaseSectionComponent,
    BreakdownRequestsComponent,
    EventDataComponent,
    PaymentsComponent,
    ReservationsComponent,
    RoomOrdersComponent,
    TaxiRequestsComponent,
    WakeupRequestsComponent,
    LogsSectionComponent,
    NotificationsSectionComponent
  ],
  providers: [],
})
export class TableSectionsModule { }
