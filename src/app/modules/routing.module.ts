import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
	CleanRequestsComponent,
	BreakdownRequestsComponent,
	EventDataComponent,
	PaymentsComponent,
	ReservationsComponent,
	RoomOrdersComponent,
	TaxiRequestsComponent,
	WakeupRequestsComponent,
	LogsSectionComponent,
	NotificationsSectionComponent
} from './table-sections/table-sections.module';

import { TasksSectionComponent } from './tasks/tasks.module';
import { RoomsSectionComponent } from './rooms/rooms.module';
import { StatsSectionComponent } from './stats/stats.module';
import { DevicesSectionComponent } from './devices/devices.module';
import { PromotionsSectionComponent } from './promotions/promotions.module';
import { AppContainerComponent } from '../components/app-container/app-container.component';

import { SessionGuard } from '../guards/session.guard';

export const routes: Routes = [
	{'path': '', component: AppContainerComponent, canActivate: [SessionGuard], children: [
		{'path': 'clean', component: CleanRequestsComponent},
		{'path': 'breakdowns', component: BreakdownRequestsComponent},
		{'path': 'eventdata', component: EventDataComponent},
		{'path': 'payments', component: PaymentsComponent},
		{'path': 'reservations', component: ReservationsComponent},
		{'path': 'orders', component: RoomOrdersComponent},
		{'path': 'taxi', component: TaxiRequestsComponent},
		{'path': 'wake_up', component: WakeupRequestsComponent},
		{'path': 'stats', component: StatsSectionComponent},
		{'path': 'tasks', component: TasksSectionComponent},
		{'path': 'logs', component: LogsSectionComponent},
		{'path': 'promotions', component: PromotionsSectionComponent},
		{'path': 'notifications', component: NotificationsSectionComponent},
		{'path': 'messages', loadChildren: './messages/messages.module#MessagesModule'},
		{'path': 'guests', loadChildren: './guests/guests.module#GuestsModule'},
		{'path': 'rooms', component: RoomsSectionComponent},
		{'path': 'devices', component: DevicesSectionComponent}
	]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class RoutingModule {}
