import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionsService } from './sections.service';
import { SessionService } from './session.service';
import { LogsService } from './logs.service';
import { CleanRequestsService } from './clean-requests.service';
import { BreakdownsRequestsService } from './breakdowns-requests.service';
import { WakeUpRequestsService } from './wakeup-requests.service';
import { ReservationsService } from './reservations.service';
import { PaymentsService } from './payments.service';
import { TasksService } from './tasks.service';
import { DevicesService } from './devices.service';
import { GuestsService } from './guests.service';
import { TaxiRequestsService } from './taxi-requests.service';
import { RoomsService } from './rooms.service';
import { DialogsService } from './dialogs.service';
import { NotificationsService } from './notifications.service';
import { OrdersService } from './orders.service';
import { ContactsService } from './contacts.service';
import { ObjectsService } from './objects.service';
import { LanguagesService } from './languages.service';
import { StatsService } from './stats.service';
import { EventsService } from './events.service';
import { UsersService } from './users.service';
import { PromotionsService } from './promotions.service';
import { HttpClientModule } from '@angular/common/http';

import { SessionHolder } from './session.holder';

export {
	SectionsService,
	SessionService,
	LogsService,
  CleanRequestsService,
  BreakdownsRequestsService,
  WakeUpRequestsService,
  ReservationsService,
  TaxiRequestsService,
  PaymentsService,
  ObjectsService,
  GuestsService,
  TasksService,
  SessionHolder,
  RoomsService,
  DevicesService,
  DialogsService,
  NotificationsService,
  OrdersService,
  ContactsService,
  LanguagesService,
  StatsService,
  EventsService,
  UsersService,
  PromotionsService
}

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule
  ],
  exports: [
  ]
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        SectionsService,
        DevicesService,
        OrdersService,
        ContactsService,
        NotificationsService,
        DialogsService,
        GuestsService,
        RoomsService,
        TasksService,
        ObjectsService,
        SessionHolder,
        SessionService,
        LogsService,
        CleanRequestsService,
        TaxiRequestsService,
        PaymentsService,
        ReservationsService,
        WakeUpRequestsService,
        BreakdownsRequestsService,
        LanguagesService,
        StatsService,
        EventsService,
        UsersService,
        PromotionsService
      ] 
    }
  }
}
