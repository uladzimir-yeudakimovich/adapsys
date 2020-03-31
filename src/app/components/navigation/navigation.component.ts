import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SectionsService } from '../../modules/services/sections.service';
import { EventsService } from '../../modules/services/events.service';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements AfterViewInit, OnInit, OnDestroy  {

  public sections: Array<Object> = [];
  public counts = {};

  private sectionsScheme = {
    'new_cleanrequests': 'rooms_clean',
    'new_eqmalrequests': 'rooms_breakdowns',
    'new_messages': 'rooms_messages',
    'new_orders': 'rooms_orders',
    'new_payments': 'rooms_payments',
    'new_reservations': 'rooms_reservations',
    'new_taxirequests': 'taxi',
    'new_wakeupcallrequests': 'rooms_wake_up'
  };

  private sub: Subscription;

  constructor(private router: Router, private sectionsService: SectionsService, private eventService: EventsService){
  	this.sectionsService.onInit().then((sections: Array<Object>) => {
  		this.sections.push(...sections);

      for(let section of sections){
        if(section['countable']){
          this.counts[section['slug']] = 0;
        }
      }
  	});
  }

  private updateCounts(): void {
    this.eventService.getEventsCount().subscribe((data: Object) => {
      for(let key in data){
        if(this.sectionsScheme.hasOwnProperty(key)){
          this.counts[this.sectionsScheme[key]] = data[key];
        }
      }
    });
  }

  ngAfterViewInit() {
  	
  }

  ngOnInit() {
    this.sub = timer(0, 5000).subscribe(() => {
      this.updateCounts();
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
