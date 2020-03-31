import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sections-common-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
	@Input('headers') columns: Array<string>;
	@Input('data') inputData: Array<Object>;
	@Output('onClick') onClick: EventEmitter<Object> = new EventEmitter<Object>();

	public data = [];

	ngOnInit(){
		this.data = this.inputData;
	}

	public click(obj: Object): void {
		this.onClick.emit(obj);
	}
}
