import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestsBaseComponent } from './components/base/base.component';
import { GuestsListComponent } from './components/list/list.component';
import { GuestsTypesComponent } from './components/types/types.component';
import { GuestsReferralsComponent } from './components/referrals/referrals.component';

export const routes: Routes = [
	{ path: '', component: GuestsBaseComponent, children:[
		{ path: 'list', component: GuestsListComponent },
		{ path: 'types', component: GuestsTypesComponent },
		{ path: 'referrals', component: GuestsReferralsComponent }
	]}
];

export const RoutingGuestsModule: ModuleWithProviders = RouterModule.forChild(routes);
