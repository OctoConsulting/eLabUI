import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'fbi-evidence-page',
  templateUrl : './fbi-evidence.page.html',
  styleUrls: ['./fbi-evidence.page.css']
})
export class FbiEvidencePage implements OnInit {
  evidenceData;
  constructor(){

  }

  ngOnInit(){
    this.evidenceData = {
      new_page_title: 'Evidence - New',
      name: 'Write Evidence Name Here',
      number: 1,
      for_analysis: false,
      types: ['container', 'package', 'item'],
      parent_number: '',
      parents: ['container_1'],
      create_another: true
    }
  }
}
