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

  getExamPageDetails(mode:string,examId?:number,caseId?: number){
    let apiOptions: any = {
        name: 'ui-exams',
        suffix: '/',
        method: 'GET',
        oParam: {} 
    };

    apiOptions.oParam.mode = mode;
    if(mode == 'edit'){
        apiOptions.oParam.examID = examId;
        apiOptions.oParam.caseID = caseId;
    }

    return this.apiService.call(apiOptions);
  }

}