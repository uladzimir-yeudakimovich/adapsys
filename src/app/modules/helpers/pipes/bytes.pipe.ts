import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'bytes'})
export class BytesPipe implements PipeTransform {

  private units = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];

  transform(bytes: number = 0, unit: string ) : string {
    if ( isNaN( parseFloat( String(bytes) )) || ! isFinite( bytes ) || !this.units.includes(unit) ) return '?';

    let unitIdx = 0;

    while ( this.units[unitIdx] != unit ) {
      bytes /= 1024;
      unitIdx++;

      if(unitIdx > 6){ 
        return '?';
      }
    }

    return bytes.toFixed( 2 );
  }
}