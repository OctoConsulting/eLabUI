import { Injectable } from '@angular/core';
import { WrapperService } from '../wrapper.service';
import { Observable } from "rxjs";

@Injectable()
export class FbiExamService {

  constructor(private apiService: WrapperService) {

  }

  getExamDetails(id:number){
    //return 'test';
    let apiOptions: any = {
      name: 'exams',
      suffix: '/',
      method: 'GET',
      oParam: { }
    };
    // specify defaults   
    apiOptions.oParam.caseId = id;

    return this.apiService.call(apiOptions);
  }


}