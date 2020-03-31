import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TasksService } from '../../../services/tasks.service';
import { GuestsService } from '../../../services/guests.service';
import { IGuest } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-tasks-edit-modal',
  templateUrl: './tasks-edit-modal.component.html',
  styleUrls: ['./tasks-edit-modal.component.scss']
})
export class TasksEditModalComponent implements OnInit {

  @ViewChild('content') content;
  @Output('onClose') onClose: EventEmitter<void> = new EventEmitter<void>();

  public task: Object;
  public isCreate = true;
  public guests: Array<IGuest> = [];

  public model = {
    address: '',
    deadline: '',
    description: '',
    latitude: 0,
    longitude: 0,
    priority: '',
    responsible: '',
    status: 'NEW',
    title: '',
    checklist: [],
    participants: []
  };

  public checklistModel = {
    name: ''
  }

  public participantModel = {
    name: '',
    phone: '',
    email: ''
  }

  private participantEdit: Object | undefined;

  constructor(private modalService: NgbModal,
              private activeModal: NgbActiveModal,
              private tasksService: TasksService,
              private guestsService: GuestsService) {}

  ngOnInit(){
    this.guestsService.getGuests().subscribe((list: Array<IGuest>) => {
      this.guests.splice(0, this.guests.length);
      this.guests.push(...list);
    });
  }

  open(task?: Object) {

    if(task){
      this.task = task;
      this.isCreate = false;
      this.loadModel();
    }

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }

  public isEditModeParticipant(obj: Object): boolean {
    if(!this.participantEdit){
      return false;
    }

    return this.isEqualObjects(obj, this.participantEdit);
  }

  public setEditModeParticipant(obj: Object): void {
    this.participantEdit = obj;
  }

  public removeEditModeParticipant(): void {
    this.participantEdit = undefined;
  }

  private loadModel(): void {
    for(let key in this.task){
      this.model[key] = this.task[key];
    }
  }

  public save(c: Function): void {
    const model = Object.assign({}, this.model);

    if(this.isCreate){
      this.tasksService.createTask(model).then((status: boolean) => {
        this.onClose.emit();
        c();
      })
    } else {
      this.tasksService.updateTask(model['_id'], model).then((status: boolean) => {
        this.onClose.emit();
        c();
      })
    }
  }

  public addChecklistItem(): void {
    if(!this.checklistModel.name){
      return;
    }

    this.model.checklist.push({
      finished: false,
      title: this.checklistModel.name
    });

    this.checklistModel.name = '';
  }

  public removeChecklistItem(item: Object): void {
    for(let i = 0; i < this.model.checklist.length; i++){
      const originalItem = this.model.checklist[i];
      if(this.isEqualObjects(originalItem, item)){
        this.model.checklist.splice(i, 1);
        return;
      }
    }
  }

  public addParticipant(): void {
    const model = this.participantModel;
    if(model.name && model.phone && model.email){
      this.model.participants.push(Object.assign({}, model));

      model.name = '';
      model.phone = '';
      model.email = '';
    }
  }

  private isEqualObjects(first: Object, second: Object): boolean {
    for(let k in first){
      if(first[k] != second[k]){
        return false;
      }
    }

    return true;
  }

  public removeParticipant(item: Object): void {
    for(let i = 0; i < this.model.participants.length; i++){
      const originalItem = this.model.participants[i];
      if(this.isEqualObjects(originalItem, item)){
        this.model.participants.splice(i, 1);
        return;
      }
    }
  }
}
