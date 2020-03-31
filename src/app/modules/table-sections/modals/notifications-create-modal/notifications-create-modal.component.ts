import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguagesService } from '../../../services/languages.service';
import { NotificationsService } from '../../../services/notifications.service';
import { ContactsService } from '../../../services/contacts.service';
import { ObjectsService } from '../../../services/objects.service';
import { GuestsService } from '../../../services/guests.service';
import { IPlace, IContact, IGuest } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-notifications-create-modal',
  templateUrl: './notifications-create-modal.component.html',
  styleUrls: ['./notifications-create-modal.component.scss']
})
export class NotificationsCreateModalComponent implements OnInit {

  @ViewChild('content') content;
  @Output('onClose') onClose: EventEmitter<void> = new EventEmitter<void>();

  public model = {
    room_n: '',
    contact: '',
    place: '',
    silent_mode: false,
    guest: ''
  };

  public multilangForm = {
    form: [
      {label: "field.title", name: "title"},
      {label: "field.description", name: "body"}
    ],
    data: {}
  };

  public contacts: Array<IContact> = [];
  public places: Array<IPlace> = [];
  public guests: Array<IGuest> = [];

  constructor(private modalService: NgbModal,
              private activeModal: NgbActiveModal,
              private notificationsService: NotificationsService,
              private contactsService: ContactsService,
              private objectsService: ObjectsService,
              private guestsService: GuestsService,
              private languagesService: LanguagesService) {}

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((list: Array<IContact>) => {
      this.contacts.splice(0, this.contacts.length);
      this.contacts.push(...list);
    });

    this.objectsService.getObjects().subscribe((list: Array<IPlace>) => {
      this.places.splice(0, this.places.length);
      this.places.push(...list);
    });
  }

  public updateGuests(): void {
    this.guests.splice(0, this.guests.length);

    if(this.model.room_n){
      this.guestsService.getGuestsByRoom(this.model.room_n).subscribe((list: Array<IGuest>) => {
        this.guests.push(...list);
      });
    }
  }

  open() {

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }

  public save(c: Function): void {
    const model = Object.assign({}, this.model);
    const lang = this.languagesService.getDefaultLanguage();
    const data = this.multilangForm.data;

    model['translations'] = data;
    model['body'] = data[lang]['body'];
    model['title'] = data[lang]['title'];

    this.notificationsService.createNotification(model).then((status: boolean) => {
      this.onClose.emit();
      c();
    })
  }

}