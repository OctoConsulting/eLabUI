import { Injectable } from '@angular/core';
import { WrapperService } from '../wrapper.service';
import { Observable } from "rxjs";

@Injectable()
export class FbiEvidenceService {

  constructor(private apiService: WrapperService) {

  }

  updateForAnalysis(id:number, forAnalysis: boolean){
    //return 'test';
    let apiOptions: any = {
      name: 'evidences',
      suffix: '/' + id + '/',
      method: 'PUT',
      oParam: { }
    };
    // specify defaults   
    apiOptions.oParam.isForAnalysis = forAnalysis;

    return this.apiService.call(apiOptions);

  }

  getEvidenceTypes(){
      let apiOptions : any = {
          name : 'evidencetypes',
          suffix : '/',
          method : 'GET',
          oParam : { }
      }

      return this.apiService.call(apiOptions);
  }


}