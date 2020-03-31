import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesBaseComponent } from './components/base/base.component';
import { MessagesDialogComponent } from './components/dialog/dialog.component';
import { MessagesPlaceholderComponent } from './components/placeholder/placeholder.component';
import { MessagesNewMessageComponent } from './components/new-message/new-message.component';

import { DialogGuard } from './guards/dialog.guard';

export const routes: Routes = [
	{ path: '', component: MessagesBaseComponent, canActivate:[DialogGuard], children:[
		{ path: '', component: MessagesPlaceholderComponent, pathMatch: 'full' },
		{ path: 'new', component: MessagesNewMessageComponent },
		{ path: ':id', component: MessagesDialogComponent, pathMatch: 'full' },
	]}
];

export const RoutingMessagesModule: ModuleWithProviders = RouterModule.forChild(routes);
