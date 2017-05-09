import {Component,OnInit, ViewChild} from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { FbiNotesService } from '../../api-kit/notes/fbi-notes.service';
import { FbiExamService } from '../../api-kit/exam/fbi-exam.service';

@Component({
    selector : 'k-details',
    templateUrl : './k-details.page.html',
    styleUrls : ['./k-details.component.css']
})
export class KDetailsPage implements OnInit{
    path : 'view' | 'new' = 'new';
    type : 'shoe' | 'tire' = 'tire';

    KtypeModel : number = 0;
    Ktype = [];

    KstyleModel : number = 0;
    Kstyle = [];
    brandName = '';
    size = '';
    model = '';
    DOT = '';
    POV : number = 0;
    PovType =[];
    textArea = '';
    textArea1 = '';
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
        this.determinePath();
                    
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

        if (/\/shoe/.test(this.router.url)){
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
        if(this.type == 'shoe'){
            this.notes.getDropDown('K Item Type','Shoe').subscribe(res =>{
                this.Ktype = res.map(this.mapLabelAndValue);
                this.Ktype.unshift({value : 0 , label : "Select Option"});
            });

            this.notes.getDropDown('Style','Shoe').subscribe( res => {
                this.Kstyle = res.map(this.mapLabelAndValue);
                this.Kstyle.unshift({value : 0 , label : "Select Option"});
            });
        }
        else{
            this.notes.getDropDown('K Item Type','Tire').subscribe(res => {
                this.Ktype = res.map(this.mapLabelAndValue);
                this.Ktype.unshift({value : 0 , label : "Select Option"});
            });

            this.notes.getDropDown('Vehicle Position').subscribe(res =>{
                this.PovType = res.map(this.mapLabelAndValue);
                this.PovType.unshift({value : 0 , label : "Select Option"});
            })
        }
    }

    getNoteDetails(){
            this.notes.getNoteById(this.id).subscribe( res => {
                //console.log(res);
                this.KtypeModel = res.noteData.type;
                this.KstyleModel = res.noteData.style;
                this.brandName = res.noteData.brandName;
                this.size = res.noteData.size;
                this.model = res.noteData.model;
                this.textArea = res.labelInfo;
                this.textArea1 = res.noteMessage;
                this.markComplete = res.markedComplete;
                this.notedId = res.caseId;
                this.examId = res.examId;
                this.parentId = res.parentId;
                this.DOT = res.noteData.dot;
                this.POV = res.noteData.pov;

                this.table1.setEvidences(res.evidences);
                
            });     
    }

    postNote(enter : string){    
    let objPost : any
    if(this.type === 'shoe'){

            objPost = {
            caseId : this.notedId,
            examId : this.examId,
            markedComplete : this.markComplete,
            noteType : 2, 
            labelInfo : this.textArea,           
            noteMessage : this.textArea1,
            noteData : {
                type : this.KtypeModel,
                style: this.KstyleModel,
                brandName: this.brandName,
                size: this.size,
                model: this.model
            }
        }
        
    } else {
            objPost = {
            caseId : this.notedId,
            examId : this.examId,
            markedComplete : this.markComplete,
            noteType : 2,            
            noteMessage : this.textArea1,
            noteData : {
                type : this.KtypeModel,                
                brandName: this.brandName,
                size: this.size,
                model: this.model,
                dot: this.DOT,
                pov: this.POV
            }
        }
    }   


        objPost.itemType = this.type;
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
                this.router.navigate(['./notes/'+this.type+'/kdetails/new',this.notedId,this.examId,this.parentId]);
                window.location.reload();
            }else{
                this.location.back();
                window.scrollTo(0,0);
            }
                
        });  
        

    } 
}