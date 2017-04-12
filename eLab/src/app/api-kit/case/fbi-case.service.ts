import { Injectable } from '@angular/core';
import { WrapperService } from '../wrapper.service';
import { Observable } from "rxjs";

@Injectable()
export class FbiCaseService {

  constructor(private apiService: WrapperService) {

  }

  getValues(limit?: number, offset?: number){
    //return 'test';
    let apiOptions: any = {
      name: 'alerts',
      suffix: '',
      method: 'GET',
      oParam: { }
    };

    // specify defaults
    apiOptions.oParam.limit = limit || 5;
    apiOptions.oParam.offset = offset || 0;

    return this.apiService.call(apiOptions);


  }


}
