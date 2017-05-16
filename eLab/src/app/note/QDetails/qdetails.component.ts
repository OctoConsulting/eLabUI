import {Component,OnInit, ViewChild} from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { FbiNotesService } from '../../api-kit/notes/fbi-notes.service';
import { FbiExamService } from '../../api-kit/exam/fbi-exam.service';

@Component({
    selector : 'q-details',
    templateUrl : './qdetails.page.html',
    styleUrls : ['qdetails.component.css']
})

export class QDetailsPage implements OnInit{
	path : 'view' | 'new' = 'new';
    type : 'shoe' | 'Tire' = 'Tire';

	QtypeModel: number = 0;
	Qtype = [];

    textArea = '';
    id : number;
    markComplete : boolean = false;

    examId: number;
    notedId: number;
    parentId: number;
    private sub: any;
    viewMode : boolean;
    createAnother : string;

    @ViewChild('table1') table1 ; 
	
    constructor(private router: Router, private route: ActivatedRoute, private location: Location,private notes: FbiNotesService, private exam : FbiExamService){
            
    }

    ngOnInit(){
    	this.Qtype = [];

        this.determinePath();
        this.determineType();
                    
        this.populateForm();         

        this.sub = this.route.params.subscribe(params => {
             
             this.examId = +params['examId']; 
             this.notedId = +params['notedId'];
             if(this.path === 'view'){
                this.id = +params['id'];
                this.getNoteDetails();
             } else{
                this.parentId = +params['parentId'];
             }
             
        });
        this.setViewMode();
    }

    setViewMode(){
        this.exam.getExamPageDetails('edit',this.examId,1).subscribe(res => {
        if(res.endDate != null && new Date(res.endDate) < new Date())
            this.viewMode = true;
        else
            this.viewMode = false;

        });
    }

    determinePath(){
        if (/\/view/.test(this.router.url)) {
            this.path = 'view';
        }

    }

    determineType(){
        if (/\/shoe/.test(this.router.url)) {
            this.type = 'shoe';
        }
    }

    mapLabelAndValue(val){
        return {label: val.value, value: val.id};
    }

    onSave(){
        this.postNote('save');
    }

    onCancel(){       
        this.location.back();
        window.scrollTo(0,0);
    }

    onCreateAnother(){
        this.postNote('another');
    }

    populateForm(){
        this.notes.getDropDown('Q Item Type','').subscribe(res =>{
                this.Qtype = res.map(this.mapLabelAndValue);
                this.Qtype.unshift({value : 0 , label : "Select Option"});
            });
    }

    getNoteDetails(){
            this.notes.getNoteById(this.id).subscribe( res => {
                //console.log(res);
               
                this.textArea = res.noteMessage;
                this.markComplete = res.markedComplete;
                this.notedId = res.caseId;
                this.examId = res.examId;
                this.parentId = res.parentId;
                this.QtypeModel = res.noteData.type;

                this.table1.setEvidences(res.evidences);
                
            });     
    }

    postNote(enter : string){    
    let objPost : any
    objPost = {
            caseId : this.notedId,
            examId : this.examId,
            markedComplete : this.markComplete,
            noteType : 3,            
            noteMessage : this.textArea,
            noteData : {
                type : this.QtypeModel
            }
        }  


        objPost.parentId = this.parentId;

        if(this.path == 'view'){
            objPost.id = this.id;
        }

        let evidences='';
        let evidenceDetails = this.table1.evidenceDetails;

        

        for (let entry of evidenceDetails) {
            if(entry.selected){
                evidences = evidences+entry._id+',';
            }
        }

        if(evidences.length > 0){
            evidences=evidences.substring(0,evidences.length-1);
        }
        objPost.evidences = evidences;  
               
        
        
        this.notes.createNote(objPost).subscribe(res => {
            if(enter === 'another'){
                this.router.navigate(['./notes/qdetails/new',this.notedId,this.examId,this.parentId]);
                window.location.reload();
            }else{
                this.router.navigate(['./notes/'+this.type+'/view',this.examId,this.parentId]);
                window.scrollTo(0,0);
            }
                
        });
        

    }     
}
