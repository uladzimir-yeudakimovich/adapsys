import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PromotionsService} from '../../../services/promotions.service';
import {LanguagesService} from '../../../services/languages.service';

@Component({
    selector: 'app-promotions-send-modal',
    templateUrl: './send-modal.html',
    styleUrls: ['./send-modal.scss']
})

export class PromotionsSendModalComponent implements OnInit {

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
        console.log(this.promotions);
    }

    open(promotionDescription?: Array<object>) {

        if (promotionDescription) {
            this.promotionDescription = promotionDescription;
            this.isCreate = false;
            this.loadModel();
        }

        this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

        }, (reason) => {

        });
    }

    private loadModel(): void {
        for (const key in this.promotionDescription) {
            this.model[key] = this.promotionDescription[key];
        }
    }

    public save(c: Function): void {
        // const model = Object.assign({}, this.model);

        /*TODO Неободимо в этом месте написать фунцию сохранения данных через servicePromotion*/
        // if(this.isCreate){
        //     this.promotionsService.createPromotions().then((status: boolean) => {
        //         this.onClose.emit();
        //         c();
        //     })
        // } else {
        //     this.promotionsService.updatePromotions().then((status: boolean) => {
        //         this.onClose.emit();
        //         c();
        //     })
        // }
    }
}
