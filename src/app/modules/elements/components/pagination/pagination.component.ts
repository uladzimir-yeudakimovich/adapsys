import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
	@Input() count: number = 0;
	@Input() perPage: number = 10;
	@Output() change: EventEmitter<number> = new EventEmitter<number>();

	private currentPage = 1;

	private indexStart = 1;
	private indexEnd = 1;

	ngOnInit(){
		this.calculateIndexs();
	}

	ngOnChanges(changes: SimpleChanges): void {

		for(let key in changes){
			if(!changes[key].firstChange){
				this.calculateIndexs();
				break;
			}
		}
		
	}

	private calculateIndexs(): void {
		if(this.count == 0){
			this.indexStart = 0;
			this.indexEnd = 0;

			return;
		}
		
		this.indexStart = (this.currentPage-1) * this.perPage;
		this.indexEnd = (this.indexStart+this.perPage > this.count) ? this.indexStart+(this.count - this.indexStart) : this.indexStart + this.perPage;
		this.indexStart += 1;
	}

	public canNext(): boolean {
		return this.indexEnd < this.count;
	}

	public canPrev(): boolean {
		return (this.currentPage-1) >= 1;
	}

	public navigate(direction: string): void {
		if(direction == 'prev' && this.canPrev()){
			this.currentPage--;
		}

		if(direction == 'next' && this.canNext()){
			this.currentPage++;
		}

		this.calculateIndexs();
	}
}
