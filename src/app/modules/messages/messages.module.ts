import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ElementsModule } from '../elements/elements.module';
import { HelpersModule } from '../helpers/helpers.module';
import { RoutingMessagesModule } from './routing-messages.module';

import { MessagesBaseComponent } from './components/base/base.component';
import { MessagesDialogComponent } from './components/dialog/dialog.component';
import { MessagesPlaceholderComponent } from './components/placeholder/placeholder.component';
import { MessagesNewMessageComponent } from './components/new-message/new-message.component';

import { MessageComponent } from './components/message/message.component';

import { DialogGuard } from './guards/dialog.guard';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MessagesBaseComponent,
    MessagesDialogComponent,
    MessagesNewMessageComponent,
    MessagesPlaceholderComponent,
    MessageComponent
  ],
  imports: [
    ElementsModule,
    CommonModule,
    FormsModule,
    RoutingMessagesModule,
    HelpersModule,
    TranslateModule,
    NgbModule.forRoot()
  ],
  exports: [
    MessagesDialogComponent,
    MessagesNewMessageComponent
  ],
  providers: [DialogGuard],
})
export class MessagesModule { }
