import { PipeTransform, Pipe } from '@angular/core';
import { LanguagesService } from '../../services/languages.service';
import { IMultilangString } from '../../../interfaces/interfaces';

@Pipe({name: 'multilang'})
export class MultilangPipe implements PipeTransform {
  constructor(private languagesService: LanguagesService){ }

  private getVariants(object: IMultilangString): Array<string> {
    const ret: Array<string> = [];

    for(let lang in object){
      if(object[lang]){
        ret.push(lang);
      }
    }

    return ret;
  }

  transform(value: IMultilangString | string, args:string[]) : any {

  	if(value == undefined){
  		return '';
  	}

  	if(typeof value == 'string'){
  		return value;
  	}

  	const languages = this.getVariants(value);
    const language = this.languagesService.chooseLanguage(languages);

    return value[language];
  }
}