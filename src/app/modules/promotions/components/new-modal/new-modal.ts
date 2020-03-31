import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PromotionsService} from '../../../services/promotions.service';

@Component({
    selector: 'app-promotions-new-modal',
    templateUrl: './new-modal.html',
    styleUrls: ['./new-modal.scss']
})

export class PromotionsNewModalComponent implements OnInit {

    @ViewChild('content') content;
    @Output('onClose') onClose: EventEmitter<void> = new EventEmitter<void>();

    public addPromotions: Object;
    public addDescriptions: Object;
    public addImages: Object;
    public description: Array<Object> = [];
    public promotions: Array<Object> = [];
    public isCreate = true;
    private resultPromotions: Array<object> = [];
    private modal = {
        open: '',
        age_range: [],
        subtitle: {
            es: ''
        },
        description: {
            es: ''
        },
        title: {
            es: ''
        },
        image: '',
        button_text: {
            es: ''
        },
        placeId: '',
        expiry_date: '',
        id: '',
        room_n: '',
        type: '',
        pending_jobs_count: 0,
        channel: [
            ''
        ],
        roomNumber: '',
        language: [],
        marital_status: 0,
        children_status: 0,
        disable_ignore: false,
        sending_promotion: false
    }

    public languages = {
        ru: false,
        fr: false,
        en: false,
        nl: false
    };
    public allLanguages = false;
    public ageRange = {
        kids: false,
        teens: false,
        adult: false,
        major: false
    };
    public allAgeRange = false;
    public disable_ignore: false;
    public sending_promotion: false;

    constructor(private modalService: NgbModal,
                private activeModal: NgbActiveModal,
                private promotionService: PromotionsService) {}

    ngOnInit(): void {
        this.addPromotions = this.promotionService.getDescriptions().subscribe((data) => data);

        this.promotionService.getPromotions().subscribe((data: Object) => {
            this.promotions.splice(0, this.promotions.length);
            this.promotions.push(...data['media']);
        });
    }

    public change() {
        if (this.languages.ru === true && this.languages.fr === true && this.languages.en === true && this.languages.nl === true) {
            this.allLanguages = false;
        }
        if (this.ageRange.kids === true && this.ageRange.teens === true && this.ageRange.adult === true && this.ageRange.major === true) {
            this.allAgeRange = false;
        }
    }

    public addLanguages() {
        if (this.languages.ru === false || this.languages.fr === false || this.languages.en === false || this.languages.nl === false) {
            this.languages.ru = true;
            this.languages.fr = true;
            this.languages.en = true;
            this.languages.nl = true;
            this.allLanguages = true;
        } else if (this.languages.ru === true && this.languages.fr === true && this.languages.en === true && this.languages.nl === true && this.allLanguages === false) {
            this.allLanguages = true;
        } else {
            this.languages.ru = false;
            this.languages.fr = false;
            this.languages.en = false;
            this.languages.nl = false;
            this.allLanguages = false;
        }
    }

    public addAge() {
        if (this.ageRange.kids === false || this.ageRange.teens === false || this.ageRange.adult === false || this.ageRange.major === false) {
            this.ageRange.kids = true;
            this.ageRange.teens = true;
            this.ageRange.adult = true;
            this.ageRange.major = true;
            this.allAgeRange = true;
        } else if (this.ageRange.kids === true && this.ageRange.teens === true && this.ageRange.adult === true && this.ageRange.major === true && this.allAgeRange === false) {
            this.allAgeRange = true;
        } else {
            this.ageRange.kids = false;
            this.ageRange.teens = false;
            this.ageRange.adult = false;
            this.ageRange.major = false;
            this.allAgeRange = false;
        }
    }

    public getMaritalStatus($event) {
        this.modal.marital_status = $event.target.value;
    }

    public getChildrenStatus($event) {
        this.modal.children_status = $event.target.value;
    }

    private getDescription(id, param) {
        this.description = [];
        for (const key in param[id]) {
            if (param[id][key] !== '') {
                this.description.push({
                    lang: key,
                    desc: this.addDescriptions[id][key],
                    img: this.addImages[id][0]
                });
            }
        }
        console.log(this.description);
    }

    open(addPromotions?: Object, addDescriptions?: Object, addImages?: Object) {
        if (addPromotions) {
            this.addPromotions = addPromotions;
            this.isCreate = false;
        }
        if (addDescriptions) {
            this.addDescriptions = addDescriptions;
            this.isCreate = false;
        }
        if (addImages) {
            this.addImages = addImages;
            this.isCreate = false;
        }
        this.modalService.open(this.content, {ariaLabelledBy: 'app-promotions-new-modal'}).result.then((result) => {console.log('222');
            }, (reason) => {console.log('333');
        });
    }

    public getIdPlace($event) {
        console.log(this.addPromotions);
        this.getDescription($event.target.value, this.addDescriptions);
    }

    public save(c: Function): void {
        for (const key in this.languages) {
            if (this.languages[key] === true) {
                this.modal.language.push(key);
            }
        }
        for (const key in this.ageRange) {
            if (this.ageRange[key] === true) {
                this.modal.age_range.push(key);
            }
        }
        this.modal.disable_ignore = this.disable_ignore;
        this.modal.sending_promotion = this.sending_promotion;
        this.resultPromotions = [];
        this.resultPromotions[0] = this.modal;
        for (const key in this.promotions) {
            this.resultPromotions.push(this.promotions[key]);
        }
        console.log(this.resultPromotions);
        // this.promotionService.createPromotions({media: this.resultPromotions});
        c();
        this.ngOnInit();
    }
}
