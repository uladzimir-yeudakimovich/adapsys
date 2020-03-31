import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PromotionsService} from '../../../services/promotions.service';
import {LanguagesService} from '../../../services/languages.service';

@Component({
    selector: 'app-promotions-details-modal',
    templateUrl: './details-modal.html',
    styleUrls: ['./details-modal.scss']
})

export class PromotionsDetailsModalComponent implements OnInit {

    @ViewChild('content') content;
    @Output('onClose') onClose: EventEmitter<void> = new EventEmitter<void>();

    public guest: Object;
    public isCreate = true;

    public languages = {};
    public guestTypes = {};

    public model = {};
    public promotions: Array<Object> = [];
    public promotionDescription: Array<Object> = [];

    constructor(private modalService: NgbModal,
                private activeModal: NgbActiveModal,
                private promotionsService: PromotionsService,
                private languagesService: LanguagesService) {}

    ngOnInit(): void {
        this.languages = this.languagesService.getLanguages();

        this.promotionsService.getPromotions().subscribe((data: Object) => {
            this.promotions.splice(0, this.promotions.length);
            this.promotions.push(...data['media']);
        });
        // console.log(this.promotions);
    }

    open(promotionDescription?: Array<object>) {

        if (promotionDescription) {
            this.promotionDescription = promotionDescription;
            this.isCreate = false;
            this.loadModel();
        }

        this.modalService.open(this.content, {ariaLabelledBy: 'app-promotions-details-modal'}).result.then((result) => {

        }, (reason) => {

        });
    }

    private loadModel(): void {
        for (const key in this.promotionDescription) {
            this.model[key] = this.promotionDescription[key];
        }
    }


}
