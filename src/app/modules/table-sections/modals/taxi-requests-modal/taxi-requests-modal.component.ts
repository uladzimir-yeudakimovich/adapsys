import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaxiRequestsService } from '../../../services/taxi-requests.service';
import { latLng, tileLayer, marker } from 'leaflet';

@Component({
  selector: 'app-taxi-requests-modal',
  templateUrl: './taxi-requests-modal.component.html',
  styleUrls: ['./taxi-requests-modal.component.scss']
})
export class TaxiRequestsModalComponent {

  @ViewChild('content') content;
  @Output('onClose') onClose: EventEmitter<void> = new EventEmitter<void>();

  private request: Object;

  public model = {
    status: '',
    message: '',
    taxi_number: ''
  };

  public mapOptions = {
     layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 17,
    center: latLng(46.879966, -121.726909)
  };

  public mapLayers = [

  ];

  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal, private taxiRequestsService: TaxiRequestsService) {}

  open(request: Object) {
  	this.request = request;
    this.model.status = request['status'];

    this.mapOptions.center = latLng(request['current_latitude'], request['current_longitude']);
    this.mapLayers.splice(0, this.mapLayers.length);
    this.mapLayers.push(marker([ request['current_latitude'], request['current_longitude'] ]));

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
  }

  public save(c: Function): void {
    this.request['message'] = this.model.message;
    this.request['status'] = this.model.status;
    this.request['taxi_number'] = this.model.taxi_number;
    
    this.taxiRequestsService.updateRequest(this.request['_id'], this.request).then((status: boolean) => {
      this.onClose.emit();
      c();
    })
  }

}