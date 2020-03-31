import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { RoutingModule } from './modules/routing.module';

import { TableSectionsModule } from './modules/table-sections/table-sections.module';
import { GuestsModule } from './modules/guests/guests.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { DevicesModule } from './modules/devices/devices.module';
import { StatsModule } from './modules/stats/stats.module';
import { PromotionsModule } from './modules/promotions/promotions.module';

import { HeaderComponent } from './components/header/header.component';
import { LangSwitcherComponent } from './components/langswitcher/langswitcher.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppContainerComponent } from './components/app-container/app-container.component';

import { SessionGuard } from "./guards/session.guard";
import { ServicesModule } from "./modules/services/services.module";

import { CookieService } from 'ngx-cookie-service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    LangSwitcherComponent,
    AppContainerComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    TasksModule,
    NgbModule.forRoot(),
    ServicesModule.forRoot(),
    TableSectionsModule,
    RoomsModule,
    GuestsModule,
    DevicesModule,
    PromotionsModule,
    StatsModule,
    LeafletModule.forRoot(),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [SessionGuard, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
