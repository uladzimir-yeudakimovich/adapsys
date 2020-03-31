import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stats-tabs',
  templateUrl: './stats-tabs.component.html',
  styleUrls: ['./stats-tabs.component.scss']
})

export class StatsTabsComponent implements OnInit {
	@Input('data') data: Array<Object>;

	public diagram = {
		view: [500,500],
		showLabels: true,
		data: []
	}

	ngOnInit(){
		this.diagramDataInit();
	}

	private diagramDataInit(): void {
		if(this.data){
			this.diagram.data.splice(0, this.diagram.data.length);

			for(let entity of this.data){
				this.diagram.data.push({
					name: entity['_id'],
					value: entity['value']
				});
			}
		}		
	}

	public beforeTabChange($event: NgbTabChangeEvent) {
      if ($event.nextId === 'tab-diagram') {
		this.diagramDataInit();
      }
    };
}
