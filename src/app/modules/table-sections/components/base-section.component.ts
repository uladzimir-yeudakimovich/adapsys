import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-base-section',
	template: `
		<div class="row mt-2 mb-2">
			<div class="col-md-12">
				<h3>{{this.title | translate}}</h3>
			</div>
			<div class="col-md-12">
				<ng-content></ng-content>
			</div>
		</div>`
})
export class BaseSectionComponent {
	@Input('title') title: string = '';
}