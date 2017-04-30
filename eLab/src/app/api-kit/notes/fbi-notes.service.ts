import { Injectable } from '@angular/core';
import { WrapperService } from '../wrapper.service';
import { Observable } from "rxjs";


@Injectable()
export class FbiNotesService {

  

   constructor(private apiService: WrapperService) {

  }

  getNoteDetails(examId:number,caseId: number,type?:string){
    //return 'test';
    let apiOptions: any = {
      name: 'examnotes',
      suffix: '/' + examId + '/',
      method: 'GET',
      oParam: { }
    };
    // specify defaults   
    apiOptions.oParam.caseId = caseId;
    if(type != null){
        apiOptions.oParam.type = type;
    }

    return this.apiService.call(apiOptions);
  }

  getDropDown(label?:string,type?:string){
    let apiOptions: any = {
      name: 'noteDropDowns',
      suffix: '/',
      method: 'GET',
      oParam: { }
    }

    if(label != null){
      apiOptions.oParam.label = label;
    }

    if(type != null){
      apiOptions.oParam.type = type;
    }

    return this.apiService.call(apiOptions);
  }

  getNoteById(id:number){
    let apiOptions: any = {
      name: "notes",
      suffix: '/' + id + '/',
      method: 'GET',
      oParam: {}
    }

    return this.apiService.call(apiOptions);
  }
}  
