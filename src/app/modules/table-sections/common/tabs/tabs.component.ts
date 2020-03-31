import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sections-common-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
	@Input('list') tabs: Array<string>;
	@Output() change: EventEmitter<string> = new EventEmitter<string>();

	private currentTab: string = '';

	public setCurrentTab(tab: string): void {
		this.currentTab = tab;
		this.change.emit(tab);
	}

	public isCurrent(tab: string): boolean {
		return this.currentTab == tab;
	}

	ngOnInit(){
		if(this.tabs.length > 0){
			this.currentTab = this.tabs[0];
		}
	}

}
