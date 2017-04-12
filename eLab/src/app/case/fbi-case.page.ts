import {Component, OnInit} from '@angular/core';
import * as moment from 'moment-timezone';
import { FbiCaseService } from '../api-kit/case/fbi-case.service';

@Component({
  selector: 'fbi-case',
  templateUrl: './fbi-case.page.html',
  styleUrls: ['./fbi-case.page.css']
})
export class FbiCasePage implements OnInit{
  casedata;
  constructor(private cs : FbiCaseService){

  }

  ngOnInit(){
    this.casedata = {
      Lab_no : '2017-118',
      Status : 'In Progress',
      Date_Opened : '2017-03-25T21:41:00.000-0400',
      Violation:  'No',
      Violation_Date: '2017-07-15T18:26:00.000-0400'
    };

    this.cs.getValues(2,2).subscribe(res => {
      console.log(res);
    });
    //console.log(moment("2021-07-25T21:41:00.000-0400").format("MMM DD, YYYY HH:mm Z"));

  }

  formatDate(date){
    if(date != '' && date != null)
      return moment(date).format("MMM DD, YYYY HH:mm Z");
    else
      return '--';
  }

}