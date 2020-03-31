import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GuestsService } from '../../../services/guests.service';
import { LanguagesService } from '../../../services/languages.service';

@Component({
  selector: 'app-guests-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class GuestsEditModalComponent implements OnInit {

  @ViewChild('content') content;
  @Output('onClose') onClose: EventEmitter<void> = new EventEmitter<void>();

  public guest: Object;
  public isCreate = true;

  public languages = {};
  public guestTypes = {};

  public model = {
    name: '',
    surname: '',
    datefrom: '',
    dateto: '',
    room: '',
    guestTypeId: '',
    confirmation_code: '',
    referral_code: '',
    language: '',
    birthdate: '',
    married: false,
    with_kids: false,
    count_adults: 0,
    count_children: 0,
    count_babies: 0,
    mobile: '',
    email: ''
  };

  constructor(private modalService: NgbModal,
              private activeModal: NgbActiveModal,
              private guestsService: GuestsService,
              private languagesService: LanguagesService) {}

  ngOnInit(): void {
    this.languages = this.languagesService.getLanguages();

    this.guestsService.getTypes().subscribe((data: Array<Object>) => {
      this.guestTypes = {};

      for(let type of data){
        this.guestTypes[type['_id']] = type['name'];
      }
    });
  }

  open(guest?: Object) {

    if(guest){
      this.guest = guest;
      this.isCreate = false;
      this.loadModel();
    }

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }

  private loadModel(): void {
    for(let key in this.guest){
      this.model[key] = this.guest[key];
    }
  }

  public save(c: Function): void {
    const model = Object.assign({}, this.model);

    for(let key of ['dateto', 'datefrom', 'birthdate']){
      if((<any> model[key]) instanceof Object){
        model[key] = model[key]['year'] + '-' + model[key]['month'] + '-' + model[key]['day'];
      }
    }

    if(model['datefrom'].indexOf('T') == -1){
      model['datefrom'] += 'T00:00:01.000Z';
    }

    if(model['dateto'].indexOf('T') == -1){
      model['dateto'] += 'T23:59:59.000Z';
    }

    if(model['birthdate'].indexOf('T') > -1){
      model['birthdate'] = model['birthdate'].split('T')[0];
    }

    if(this.isCreate){
      this.guestsService.createGuest(model).then((status: boolean) => {
        this.onClose.emit();
        c();
      })
    } else {
      this.guestsService.updateGuest(model['_id'], model).then((status: boolean) => {
        this.onClose.emit();
        c();
      })
    }
  }
}
