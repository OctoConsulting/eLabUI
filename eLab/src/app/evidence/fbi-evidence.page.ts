import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'fbi-evidence-page',
  templateUrl : './fbi-evidence.page.html',
  styleUrls: ['./fbi-evidence.page.css']
})
export class FbiEvidencePage implements OnInit {
  mode: 'view' | 'edit' = 'edit';

  evidenceData;
  constructor(){

  }

  ngOnInit(){
    this.evidenceData = {
      number: 1,
      for_analysis: false,
      types: ['container', 'package', 'item'],
      parent_number: '',
      parents: ['container_1'],
      create_another: true
    }
  }
}
