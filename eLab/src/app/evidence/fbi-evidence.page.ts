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
  
  id : number;
  evidenceTypes = [];
  parentTypes = [];
  ParentTypeModel : number = 0;
  evidenceData;
  typeModel: number = 0;
  
  containers : any;
  packages : any;
  items : any;

  ParentEvidenceModel : any = '';
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
    
    if(this.mode === 'view'){
      this.determineParam();
      this.getEvidenceDetails();      
    }
    this.parentEvidence();
    
  }

  determineMode() {
    if (/\/view/.test(this.router.url)) {
      this.mode = 'view';
    }
  }

  getEvidenceTypes() {
    this.evidence.getEvidenceTypes().subscribe(res => {
      this.evidenceTypes = res.map(this.mapLabelAndValue);
    });

  }

  mapLabelAndValue(val) {
    return { value: val.id, label: val.description };
  }

  mapLabel(val){
    return {value: val.id, label: val._id};
  }

  determineParam() {
    this.route.params.subscribe(param => {
      this.selectedId = param['id'];      
    });
  }

  getEvidenceDetails(){
    this.evidence.getEvidenceDetails(this.selectedId).subscribe( res =>{
      this.typeModel = res.evidenceType;
      this.evidenceName = res.evidenceName;
      this.forAnalysis = res.isForAnalysis;
      
      this.id = res._id;
      this.getParentType();
      this.parentEvidence();
      
      if(this.typeModel == 1){
        this.ParentTypeModel = 0;  
      }
      else{
        this.ParentTypeModel = 1;
      }
      //this.getParentEvidences();
    });
  }

  getParentType(){
    if(this.typeModel == 1){
      this.parentTypes = [];
      this.parentTypes.push({value : 0, label : "Select Option"});      
    }
    else if(this.typeModel == 2){
      this.parentTypes = [];
      this.parentTypes.push({value : 0, label : "Select Option"});
      this.parentTypes.push({value : 1, label : "Container"});
      this.parentTypes.push({value: 2, label : "Package"});      
    }
    else{
      this.parentTypes = [];
      this.parentTypes.push({value : 0, label : "Select Option"});
      this.parentTypes.push({value : 1, label : "Container"});
      this.parentTypes.push({value : 2, label : "Package"});
      this.parentTypes.push({value : 3, label : "Item"});      
    }        
  }

  getParentEvidences(){
       
    if(this.ParentTypeModel == 1){
      this.parentEvidences = [];
      this.parentEvidences = this.containers.map(this.mapLabel);
      this.parentEvidences.unshift({value : '', label : "Select Option"});
    }
    else if(this.ParentTypeModel == 2){
      this.parentEvidences = [];
      this.parentEvidences = this.packages.map(this.mapLabel);
      this.parentEvidences.unshift({value : '', label : "Select Option"});
    }
    else if(this.ParentTypeModel == 3){
      this.parentEvidences = [];
      this.parentEvidences = this.items.map(this.mapLabel);
      this.parentEvidences.unshift({value : '', label : "Select Option"});
    }
    else{
      this.parentEvidences = [];
      this.parentEvidences.push({value : '', label : "Select Option"});
    }
    
  }

  changeParentOptions(){
    this.getParentType();
    
  }

  onChange(){
    this.getParentEvidences();
  }

  parentEvidence(){
    this.evidence.getParentEvidence(1).subscribe( res => {
      console.log(res);
      this.containers = res.containers;
      this.packages = res.packages;
      this.items = res.items;
      this.getParentEvidences();       
    });
    
  }

  onSave(){
    if(this.mode == 'new'){
      let obj = {
        caseId : 1,
        evidenceName : this.evidenceName,
        evidenceType : this.typeModel,
        isForAnalysis : this.forAnalysis,
        parentId : this.ParentEvidenceModel,      
      } 

      this.evidence.createEvidences(obj).subscribe(res => {
        console.log(res);
        this.router.navigate(['./']);
      });
    }
    else{
      console.log("Here");
      let obj = {
        caseId : 1,
        evidenceName : this.evidenceName,
        evidenceType : this.typeModel,
        isForAnalysis : this.forAnalysis,
        parentId : this.ParentEvidenceModel,
        id : this.selectedId      
      } 

      this.evidence.updateEvidences(obj).subscribe(res => {
        console.log(res);
        this.router.navigate(['./']);
      });
    }
    
    
  }

  postEvidence(){
    if(this.mode == 'new'){
      let obj = {
        caseId : 1,
        evidenceName : this.evidenceName,
        evidenceType : this.typeModel,
        isForAnalysis : this.forAnalysis,
        parentId : this.ParentEvidenceModel,      
      }

      this.evidence.createEvidences(obj).subscribe(res => {
        console.log(res);
        window.location.reload();
        this.router.navigate(['./evidence/new']);
      });

    }
    else{
      let obj = {
        caseId : 1,
        evidenceName : this.evidenceName,
        evidenceType : this.typeModel,
        isForAnalysis : this.forAnalysis,
        parentId : this.ParentEvidenceModel,
        id : this.selectedId      
      }

      this.evidence.updateEvidences(obj).subscribe(res => {
        console.log(res);
        window.location.reload();
        this.router.navigate(['./evidence/new']);
      });

    }
  }

  onCancel(){
    this.router.navigate(['./']);
  }

  onCreateAnother(){
    this.postEvidence();
    this.createAnother = false;
    
  }

    
}
