import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { HelpersModule } from '../helpers/helpers.module';

import { PaginationComponent } from './components/pagination/pagination.component';
import { RadioGroupComponent } from './components/radio-group/radio-group.component';
import { MultilangFormComponent } from './components/multilang-form/multilang-form.component';

@NgModule({
  declarations: [
    PaginationComponent,
    RadioGroupComponent,
    MultilangFormComponent
  ],
  imports: [
    CommonModule,
    HelpersModule,
    TranslateModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  exports: [
    PaginationComponent,
    RadioGroupComponent,
    MultilangFormComponent
  ],
  providers: [],
})
export class ElementsModule { }
