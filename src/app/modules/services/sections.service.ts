import { Injectable } from '@angular/core';
import { SessionHolder } from './session.holder';

@Injectable()
export class SectionsService {
	private sections = [
		{title: 'section.tasks', countable: false, url: '/tasks', slug: 'tasks'},
		{title: 'section.messages', countable: true, url: '/messages', slug: 'rooms_messages'},
		{title: 'section.notifications', countable: false, url: '/notifications', slug: 'rooms_notifications'},
		{title: 'section.orders', countable: true, url: '/orders', slug: 'rooms_orders'},
		{title: 'section.clean-requests', countable: true, url: '/clean', slug: 'rooms_clean'},
		{title: 'section.breakdowns', countable: true, url: '/breakdowns', slug: 'rooms_breakdowns'},
		{title: 'section.wakeup-requests', countable: true, url: '/wake_up', slug: 'rooms_wake_up'},
		{title: 'section.dayplanner', countable: false, url: '/eventdata', slug: 'eventdata'},
		{title: 'section.reservation', countable: true, url: '/reservations', slug: 'rooms_reservations'},
		{title: 'section.payments', countable: true, url: '/payments', slug: 'rooms_payments'},
		{title: 'section.taxi-requests', countable: true, url: '/taxi', slug: 'taxi'},
		{title: 'section.rooms', countable: false, url: '/rooms', slug: 'room_entities'},
		{title: 'section.tablets', countable: false, url: '/devices', slug: 'devices'},
		{title: 'section.guests', countable: false, url: '/guests/list', slug: 'guests'},
		{title: 'section.promotions', countable: false, url: '/promotions', slug: 'promotions'},
		{title: 'section.logs', countable: false, url: '/logs', slug: 'logs_checkin'},
		{title: 'section.stats', countable: false, url: '/stats', slug: 'stats'}
	];

	private sections_available: Array<Object> = [];

	onInit(): Promise<Array<Object>> {
		return new Promise((resolve, reject) => {

			if(this.sections_available.length > 0){
				resolve(this.sections_available);
			} else {
				for(let i = 0; i < this.sections.length; i++){
					if(this.session.isTabAvailable(this.sections[i].slug)){
						this.sections_available.push(this.sections[i]);
					}
				}
				resolve(this.sections_available);
			}
		});
	}

	public getAvailableSections(): Array<Object> {
		return this.sections_available;
	}

	constructor( private session: SessionHolder ){}
}