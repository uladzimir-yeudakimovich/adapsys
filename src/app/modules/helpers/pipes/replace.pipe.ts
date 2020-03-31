import { Pipe, PipeTransform  } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {
  
  transform (input: string, pattern: string, replacement: string): string {
    
    if (!(typeof input == 'string')) {
      return input;
    }
    
    return input.replace(pattern, replacement);
  }
}