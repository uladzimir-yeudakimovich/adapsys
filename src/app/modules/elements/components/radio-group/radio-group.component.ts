import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent implements OnInit {
	@Input('list') radios: Object;
	@Output() change: EventEmitter<string> = new EventEmitter<string>();

	private currentState: string;

	public isCurrent(key: string): boolean {
		return this.currentState == key;
	}

	public setCurrentState(key: string): void {
		this.currentState = key;
		this.change.emit(key);
	}

	ngOnInit(){

		for(let k in this.radios){
			this.currentState = k;
			break;
		}

	}
}
