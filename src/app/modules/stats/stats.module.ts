import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { StatsSectionComponent } from './stats.component';
import { StatsFilterComponent } from './components/stats-filter/stats-filter.component';
import { StatsTabsComponent } from './components/stats-tabs/stats-tabs.component';

import { HelpersModule } from '../helpers/helpers.module';
import { ElementsModule } from '../elements/elements.module';
import { TranslateModule } from '@ngx-translate/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

export {
  StatsSectionComponent
};

@NgModule({
  declarations: [
    StatsSectionComponent,
    StatsFilterComponent,
    StatsTabsComponent
  ],
  imports: [
    CommonModule,
    HelpersModule,
    ElementsModule,
    FormsModule,
    NgxChartsModule,
    NgbModule.forRoot(),
    TranslateModule
  ],
  exports: [
    StatsSectionComponent
  ],
  providers: []
})
export class StatsModule { }
