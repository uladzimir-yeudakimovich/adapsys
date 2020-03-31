import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

import { APIService } from './api.service';

export { APIService };

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule.forRoot()
  ],
  exports: [
  ],
  providers: [],
})
export class AbstractModule { }
