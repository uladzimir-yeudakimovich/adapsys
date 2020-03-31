import { Component, OnInit, ViewChild } from '@angular/core';
import {ISection} from '../../interfaces/interfaces';
import { PromotionsService } from '../services/promotions.service';
import { PromotionsNewModalComponent } from './components/new-modal/new-modal';
import { PromotionsDetailsModalComponent } from './components/details-modal/details-modal';
import { PromotionsSendModalComponent } from './components/send-modal/send-modal';

@Component({
  selector: 'app-section-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})

export class PromotionsSectionComponent implements ISection, OnInit {
    @ViewChild('newModal') newModal: PromotionsNewModalComponent;
    @ViewChild('detailsModal') detailsModal: PromotionsDetailsModalComponent;
    @ViewChild('sendModal') sendModal: PromotionsSendModalComponent;

	title = 'section.promotions'

	public promotions: Array<Object> = [];
    public addPromotions: Array<Object> = [];
    public addDescription: Array<Object> = [];
    public addImages: Array<Object> = [];
    public promotionDescription: Array<Object> = [];

	constructor(private promotionsService: PromotionsService ) {}

	ngOnInit() {
		this.update();
	}

	public update(): void {
		this.promotionsService.getPromotions().subscribe((data: Object) => {
			this.promotions.splice(0, this.promotions.length);
			this.promotions.push(...data['media']);
		});
	}

    public showModalCreate(): void {
        this.promotionsService.getDescriptions().subscribe((data) => {
            for (const key in data) {
                if (data[key].name.en !== '') {
                    this.addPromotions.push(data[key]);
                    this.addDescription[data[key]._id] = data[key].description;
                    this.addImages[data[key]._id] = data[key].media;
                }
            }
            // console.log(this.addPromotions);
            console.log(this.addDescription);
            console.log(this.addImages);
        });
        this.newModal.open(this.addPromotions, this.addDescription, this.addImages);
    }

    public showModalDetails(id): void {
        if (event.target['nodeName'] === 'SPAN' || event.target['nodeName'] === 'INPUT') {
            return;
        }
        for (const key in this.promotions) {
            if (this.promotions[key]['id'] === id) {
                this.promotionDescription.length = 0;
                this.promotionDescription.push(this.promotions[key]);
                this.detailsModal.open(this.promotionDescription);
                break;
            }
        }
    }

    public showModalSend(id): void {
        for (const key in this.promotions) {
            if (this.promotions[key]['id'] === id) {
                this.promotionDescription.length = 0;
                this.promotionDescription.push(this.promotions[key]);
                this.sendModal.open(this.promotionDescription);
                break;
            }
        }
    }
}
