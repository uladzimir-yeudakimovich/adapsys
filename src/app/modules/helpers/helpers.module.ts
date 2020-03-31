import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeysPipe } from './pipes/keys.pipe';
import { MultilangPipe } from './pipes/multilang.pipe';
import { ReplacePipe } from './pipes/replace.pipe';
import { BytesPipe } from './pipes/bytes.pipe';

@NgModule({
  declarations: [
    KeysPipe,
    MultilangPipe,
    ReplacePipe,
    BytesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    KeysPipe,
    MultilangPipe,
    ReplacePipe,
    BytesPipe
  ],
  providers: [MultilangPipe],
})
export class HelpersModule { }
