import {Component, OnInit, Input} from '@angular/core';
import { FbiEvidenceService } from '../../api-kit/evidences/fbi-evidences.service';



@Component({
    selector : 'evidence-table',
    templateUrl : './evidence-table.template.html',
    styleUrls : ['evidence-table.component.css']
})
export class EvidenceTable implements OnInit{

    evidenceDetails = [];
    evidences : string;
    constructor(private evidence: FbiEvidenceService){
        
    }

    @Input() path;
    @Input() details;
    @Input() noteId;
    @Input() examId;

    ngOnInit(){
        

         this.getAllEvidences();

    }

    getAllEvidences() {
        this.evidence.getAllEvidences(1,this.examId,this.noteId).subscribe(res => {
            
            this.evidenceDetails = res;

            if(this.evidences){
                let updatedDetails = [];
                let evidenceList = this.evidences.split(',');
                for (let entry of this.evidenceDetails) {
                    for(let evidence of evidenceList){
                        if(entry._id == evidence){
                            entry.selected = true;
                        }
                    }
                    updatedDetails.push(entry);
                }
                this.evidenceDetails = updatedDetails;
            } 
        });        

    }

    setEvidences(evidences : string){
        this.evidences = evidences;
    }
    

}