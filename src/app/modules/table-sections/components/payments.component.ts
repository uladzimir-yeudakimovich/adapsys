import { Component } from '@angular/core';
import { ISection } from '../../../interfaces/interfaces';

import { PaymentsService } from '../../services/payments.service';

@Component({
  selector: 'app-payments',
  template: `
  	<app-base-section [title]="this.title">
	  	<sections-common-table [headers]="this.headers" [data]="this.data"></sections-common-table>
			<pagination
	  				[count]="this.data.length"
	  				[perPage]="10"
	  				(change)="this.setPage"
	  		></pagination>
  	</app-base-section>
  `,
  styleUrls: ['./../scss/common.scss']
})
export class PaymentsComponent implements ISection {
	public title = 'section.payments';
	public data = [

	];
	public headers = ['guest', 'date', 'status', 'amount', 'API', 'items-type', 'items-payment-id'];

	public update(): void {
		this.paymentsService.getPayments().subscribe(
			(data: Array<Object>) => {
				this.data.splice(0, this.data.length);

				for(let i = 0; i < data.length; i++){
					if(data[i].hasOwnProperty('current_page')){
						continue;
					}
					
					this.data.push({
						cols:[
							data[i]['guestName'],
							data[i]['date'],
							data[i]['status'],
							data[i]['amount'],
							data[i]['api_type'],
							data[i]['item_type'],
							data[i]['item_payment_id']
						],
						_object: data[i]
					});
				}

				console.log(this.data);
			},
			err => console.error(err),
		);
	}

	ngOnInit(){
		this.update();
	}

	constructor(private paymentsService: PaymentsService){}
}
