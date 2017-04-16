import {Component, OnInit} from '@angular/core';
import * as moment from 'moment-timezone';
import { FbiCaseService } from '../api-kit/case/fbi-case.service';

@Component({
  selector: 'fbi-case',
  templateUrl: './fbi-case.page.html',
  styleUrls: ['./fbi-case.page.css']
})
export class FbiCasePage implements OnInit{
  casedata = {id : '',Lab_no :'', Status : '',Date_Opened :'',Violation : '', Violation_Date :'',isActive : true,container : []};
  constructor(private cs : FbiCaseService){

  }

  ngOnInit(){
    /*this.casedata = {
      Lab_no : '2017-118',
      Status : 'In Progress',
      Date_Opened : '2017-03-25T21:41:00.000-0400',
      Violation:  'No',
      Violation_Date: '2017-07-15T18:26:00.000-0400'
    };*/

    this.cs.getCaseDetails(1).subscribe(res => {
      //console.log(res);
      let oDate = res.openedDatetime.split(" ");
      let openDate = oDate[0];
      let vDate = res.violationDatetime.split(" ");
      let vioDate = vDate[0];

      this.casedata.id = res.id;
      this.casedata.Lab_no = res.labNo;
      this.casedata.Date_Opened = openDate;
      this.casedata.Status = res.status;
      this.casedata.Violation = res.violation;
      this.casedata.Violation_Date = vioDate;
      this.casedata.isActive = res.isActive;
      this.casedata.container = res.containers;
      //console.log(this.casedata.container);
    });
    //console.log(moment("2021-07-25T21:41:00.000-0400").format("MMM DD, YYYY HH:mm Z"));
    
  }

  formatDate(date){
    if(date != '' && date != null)
      return moment(date).format("MMM DD, YYYY HH:mm");
    else
      return '--';
  }

}
