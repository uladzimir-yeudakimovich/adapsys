import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TasksSectionComponent } from './tasks.component';
import { TasksFilterComponent } from './components/tasks-filter/tasks-filter.component';
import { TasksEditModalComponent } from './components/tasks-edit-modal/tasks-edit-modal.component';

import { HelpersModule } from '../helpers/helpers.module';
import { ElementsModule } from '../elements/elements.module';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

export {
  TasksSectionComponent
};

@NgModule({
  declarations: [
    TasksSectionComponent,
    TasksFilterComponent,
    TasksEditModalComponent
  ],
  imports: [
    CommonModule,
    HelpersModule,
    ElementsModule,
    FormsModule,
    NgbModule.forRoot(),
    TranslateModule
  ],
  exports: [
    TasksSectionComponent
  ],
  providers: []
})
export class TasksModule { }
