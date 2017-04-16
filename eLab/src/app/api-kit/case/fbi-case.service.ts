import { Injectable } from '@angular/core';
import { WrapperService } from '../wrapper.service';
import { Observable } from "rxjs";

@Injectable()
export class FbiCaseService {

  constructor(private apiService: WrapperService) {

  }

  getCaseDetails(id:number){
    //return 'test';
    let apiOptions: any = {
      name: 'case',
      suffix: '/' + id + '/',
      method: 'GET',
      oParam: { }
    };
    // specify defaults   

    return this.apiService.call(apiOptions);


  }


}
