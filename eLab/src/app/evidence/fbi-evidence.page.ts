import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FbiEvidenceService } from '../api-kit/evidences/fbi-evidences.service';

@Component({
  selector: 'fbi-evidence-page',
  templateUrl: './fbi-evidence.page.html',
  styleUrls: ['./fbi-evidence.page.css']
})
export class FbiEvidencePage implements OnInit {
  mode: 'view' | 'new' = 'new';
  selectedId : number;
  
  evidenceTypes = [];
  parentTypes = [];
  ParentTypeModel : number = 0;
  evidenceData;
  typeModel: number = 0;

  ParentEvidenceModel : number = 0;
  parentEvidences = [];

  evidenceName : string = '';
  forAnalysis : boolean = false;

  createAnother : boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private evidence: FbiEvidenceService) {

  }

  ngOnInit() {
    this.evidenceData = {
      number: 1,
      for_analysis: false,
      types: ['container', 'package', 'item'],
      parent_number: '',
      parents: ['container_1'],
      create_another: true
    }

    this.determineMode();
    this.getEvidenceTypes();
    this.getParentType();
    this.getParentEvidences();
    if(this.mode === 'view'){
      this.determineParam();
      this.getEvidenceDetails();
      
    }
    
  }

  determineMode() {
    if (/\/view/.test(this.router.url)) {
      this.mode = 'view';
    }
  }

  getEvidenceTypes() {
    this.evidence.getEvidenceTypes().subscribe(res => {
      this.evidenceTypes = res.map(this.mapLabelAndValue);
      this.evidenceTypes.unshift({ value: 0, label: 'Select Option' });
      //console.log(this.evidenceTypes);
    });

  }

  mapLabelAndValue(val) {
    return { value: val.id, label: val.description };
  }

  determineParam() {
    this.route.params.subscribe(param => {
      this.selectedId = param['id'];
      //console.log(id);
    });
  }

  getEvidenceDetails(){
    //console.log(this.selectedId);
    this.evidence.getEvidenceDetails(this.selectedId).subscribe( res =>{
      this.typeModel = res.evidenceType;
      this.evidenceName = res.evidenceName;
      this.forAnalysis = res.isForAnalysis;
      this.getParentType();
      if(this.typeModel == 1){
        this.ParentTypeModel = 0;  
      }
      else{
        this.ParentTypeModel = 1;
      }
      this.getParentEvidences();
    });
  }

  getParentType(){
    if(this.typeModel == 1){
      this.parentTypes = [];
      this.parentTypes.push({value : 0, label : "Select Options"});      
    }
    else if(this.typeModel == 2){
      this.parentTypes = [];
      this.parentTypes.push({value : 0, label : "Select Options"});
      this.parentTypes.push({value : 1, label : "Container"});
      this.parentTypes.push({value: 2, label : "Package"});      
    }
    else{
      this.parentTypes = [];
      this.parentTypes.push({value : 0, label : "Select Options"});
      this.parentTypes.push({value : 1, label : "Container"});
      this.parentTypes.push({value : 2, label : "Package"});
      this.parentTypes.push({value : 3, label : "Item"});      
    }    
  }

  getParentEvidences(){
    this.parentEvidences = [
      {value : 0, label: "Select Option"},
      {value : 1, label: "1"}
    ];
  }

  changeParentOptions(){
    this.getParentType();
    this.getParentEvidences();
  }

  onChange(){
    console.log(this.ParentTypeModel);
  }

  onSave(){
    console.log(this.typeModel);
    console.log(this.ParentTypeModel);
    console.log(this.ParentEvidenceModel);
    console.log(this.evidenceName);
    console.log(this.forAnalysis);
    console.log(this.selectedId);
    this.router.navigate(['./']);
  }

  onCancel(){
    this.router.navigate(['./']);
  }

  onCreateAnother(){
    this.createAnother = false;
    window.location.reload();
  }
  
}
