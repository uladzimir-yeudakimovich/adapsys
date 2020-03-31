import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { SessionHolder } from '../../modules/services/session.holder';
import { SessionService } from '../../modules/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

	private sub: Subscription;
	public currentDate = (new Date());
	public hotelName = '';

	constructor(private sessionService: SessionService, private sessionHolder: SessionHolder){}

	public updateClock(): void {
		this.currentDate = (new Date());
	}

	public logout(): void {
		this.sessionService.logout();
	}

	ngOnInit(){
	    this.sub = timer(0,5000).subscribe(() => {
	    	this.updateClock();
	    });

	    const userInfo = this.sessionHolder.getHotelInfo();
	    this.hotelName = userInfo.hotel_name;

	}

	ngOnDestroy(){
		this.sub.unsubscribe();
	}
}
