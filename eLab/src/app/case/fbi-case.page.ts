import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'fbi-case',
  templateUrl: './fbi-case.page.html',
  styleUrls: ['./fbi-case.page.css']
})
export class FbiCasePage implements OnInit{
  casedata;
  constructor(){

  }

  ngOnInit(){
    this.casedata = {
      Lab_no : '2017-118',
      Status : 'In Progress',
      Date_Opened : '3/27/2017 1:40 PM',
      Violation:  'No',
      Violation_Date: '3/15/2017 10:22 PM'
    };
  }
}
