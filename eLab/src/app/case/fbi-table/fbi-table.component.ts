import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FbiEvidenceService } from '../../api-kit/evidences/fbi-evidences.service';

@Component({
  selector: 'fbi-table',
  templateUrl: "./fbi-table.template.html",
  styleUrls: ['./fbi-table.component.css']
})
export class FBITable implements OnInit {
  evidenceTypes = [];
  flag = false;
  tabData;
  checked: any = [];
  rowNum = 0;
  @Input() evidenceContainer;

  heading: {
    tableHeading: string,
    mainHeading: any,
    addButton: string,
  };

  constructor(private router: Router, private route: ActivatedRoute,private evidence: FbiEvidenceService) {

  }

  ngOnInit() {

    this.heading = {
      tableHeading: 'Evidence',
      mainHeading: ['Type', 'ID', 'Name', 'For Analysis'],
      addButton: 'Create Evidence',
    };

    this.getEvidenceTypes();

  }

  checkFlag() {
    this.flag = !this.flag;
    if(this.flag == true)
    return 'bg-grey';

    else
      return '';
  }

  checkEvidenceType(type: number) {
    let value = '';
    this.evidenceTypes.forEach(types => {
      if (types.id === type) {
        value = types.description;
      }
    });

    return value;
  }

  getEvidenceTypes() {
    this.evidence.getEvidenceTypes().subscribe(res => {
      this.evidenceTypes = res;
    });
  }

  OnChange(event, flag) {
    //console.log("Clicked " + event + " , " +  flag);
    this.evidence.updateForAnalysis(event, flag).subscribe(res => {
      //console.log(res);
    });
  }

  viewEvidence(event) {
    this.router.navigate(['./evidence/view/',event]);
    window.scrollTo(0,0);    
  }

  evidenceBtn(){
    this.router.navigate(['./evidence/new']);
    window.scrollTo(0,0);
  }
}
