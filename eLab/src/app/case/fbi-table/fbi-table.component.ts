import {Component, OnInit,Input} from '@angular/core';
import { FbiEvidenceService } from '../../api-kit/evidences/fbi-evidences.service';

@Component({
  selector: 'fbi-table',
  templateUrl : "./fbi-table.template.html",
  styleUrls : ['./fbi-table.component.css']
})
export class FBITable implements OnInit{
  evidenceTypes = [];
  flag = false;
  tabData;
  checked : any = [];

  @Input() evidenceContainer;

  heading:{
    tableHeading : string,
    mainHeading : any,
    addButton : string,
  };

  constructor(private evidence : FbiEvidenceService){
    
  }

  ngOnInit(){
    
    this.heading = {
      tableHeading : 'Evidence',
      mainHeading : ['Type', 'Number', 'Name','For Analysis'],
      addButton : 'Create Evidence',
    };

    this.getEvidenceTypes();
    
  }

  checkFlag(){
    this.flag = !this.flag;
    return this.flag;    
  }

  checkEvidenceType(type : number){
    let value = '';
    this.evidenceTypes.forEach(types => {
      console.log(types.id + "," + type)
      if(types.id === type){
        console.log(type);
        value = types.description;
      }
    });

    return value;

    // if(type === 1)
    //   return "Container";
    // else if(type === 2)
    //   return "Package";
    // else  
    //   return "Item";
  }

  getEvidenceTypes(){
    this.evidence.getEvidenceTypes().subscribe(res => {
      this.evidenceTypes = res;
    });
  }

  OnChange(event,flag){
    
    //console.log("Clicked " + event + " , " +  flag);
    this.evidence.updateForAnalysis(event,flag).subscribe( res => {
      //console.log(res);
    });
  }


}
