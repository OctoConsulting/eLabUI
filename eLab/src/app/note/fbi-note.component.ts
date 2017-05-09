import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import * as moment from 'moment-timezone';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import { FbiNotesService } from '../api-kit/notes/fbi-notes.service';
import { FbiExamService } from '../api-kit/exam/fbi-exam.service';

@Component({
    selector : 'fbi-note',
    templateUrl : './fbi-note.page.html',
    styleUrls : ['./fbi-note.component.css']
})
export class FBINotePage implements OnInit{
    path : 'view' | 'new' = 'new';
    type : 'Shoe' | 'Tire' = 'Tire';

    assessmentModel = 0;
    assessmentOptions = [];

    conductedBy = 0;
    conductedOptions = [];

    startDate = { date: '', month: '', year: '', hours: '', mins: '',secs: '', zone: '' };
    startDateError: boolean = false;

    requestType : any;
    requestOptions = [];

    methodModel = 0;
    methodOptions = [];

    id : number;
    examId : number;
    textData : any;
    markComplete : boolean = false;
    tableDetailKnown = [];
    tableDetailQues = [];
    now = moment();
    viewMode : boolean = false;
    createAnother : string;

    constructor( private router: Router, private route: ActivatedRoute, private location: Location, private note : FbiNotesService, private exam : FbiExamService){

    }
    

    ngOnInit(){
        this.determinePath();
        this.determineType();

        this.assessmentModel = 0;
        this.assessmentOptions = [
            {value : 0, label : 'Select Option'},
            {value : 1, label : 'Initial Assessment'}
        ];

        this.route.params.subscribe(param => {
            this.id = param['id'];
            this.examId = param['examId'];
            //console.log("Note id " + this.id);
            // console.log("Exam id " + this.examId);
        });

        this.requestType =[];
        


        this.startDate = {
            date: this.now._d.getDate(),
            month: this.now._d.getMonth() + 1,
            year: this.now._d.getFullYear(),
            hours: this.now._d.getHours(),
            mins: this.now._d.getMinutes(),
            secs: this.now._d.getSeconds(),
            zone: moment().format('Z')
        }        
        
        this.populateForm();
        this.getNoteDetails();
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
    
    determinePath() {
        if (/\/view/.test(this.router.url)) {
            this.path = 'view';
        }
    }

    determineType(){
        if (/\/shoe/.test(this.router.url)) {
            this.type = 'Shoe';
        }
    }

    mapLabelAndValue(val){
        return {label: val.value, value: val.id};
    }

    validateDate() {
        if(this.startDate.year != '' || this.startDate.month != '' || this.startDate.date != ''){
            this.startDate.hours = this.now._d.getHours();
            this.startDate.mins = this.now._d.getMinutes();
            this.startDate.secs = this.now._d.getSeconds();
            this.startDate.zone = moment().format('Z');

            if (!moment(this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.date + 'T' + this.startDate.hours + ":" + this.startDate.mins + this.startDate.zone, "YYYY-MM-DDTHH:mmZ").isValid()) {
                this.startDateError = true;
            }
            else {
                this.startDateError = false;
            }
        }

    }

    onSave(){
        this.validateDate();
        if(this.startDateError === false){
            this.postNote('save');   
        }
    }

    onCancel(){
        this.location.back();
        window.scrollTo(0,0);
    }

    onCreateAnother(){
        this.validateDate();
        if(this.startDateError === false){
            this.postNote('another');   
        }
    }
    kqButton(event){
        this.validateDate();
        if(this.startDateError === false){
            this.postNote(event);   
        }  
    }

    populateForm(){
        this.note.getDropDown('Conducted by').subscribe(res => {
            this.conductedOptions = res.map(this.mapLabelAndValue);
            this.conductedOptions.unshift({value : 0, label : "Select Option"});
        });
        this.note.getDropDown('Request Type',this.type).subscribe(res =>{
            this.requestOptions = res.map(this.mapLabelAndValue);            
        });
        this.note.getDropDown('Method',this.type).subscribe(res => {
            this.methodOptions = res.map(this.mapLabelAndValue);
            this.methodOptions.unshift({value : 0, label : 'Select Option'});
        });
    }

    getNoteDetails(){
       if(this.path != 'new'){
            this.note.getNoteById(this.id).subscribe( res => {
                //console.log(res);
                this.conductedBy = res.noteData.conductedBy;
                this.startDate.date = moment(res.createdDate).format("DD");
                this.startDate.month = moment(res.createdDate).format("MM");
                this.startDate.year = moment(res.createdDate).format("YYYY");
                this.methodModel = res.noteData.method;
                this.textData = res.noteMessage;
                this.markComplete = res.markedComplete;
                this.requestType = JSON.parse("[" + res.noteData.requestType + "]");
                
            });

            
            this.note.getNoteDetails(this.examId,1,this.type).subscribe( res => {
                if(this.type =='Shoe' && res.length > 0){
                    res[0].shoeNotes.forEach(note => {
                        //console.log(note.knowns);
                        if(note.initialAssessmentNote.id == this.id){
                            this.tableDetailKnown = note.knowns;
                            this.tableDetailQues = note.questions;
                        }   
                        
                    });
                }
                else if(this.type =='Tire' && res.length > 0){
                    //this.tableDetail = res[0].tireNotes;
                    res[0].tireNotes.forEach(note => {
                        if(note.initialAssessmentNote.id == this.id){
                            this.tableDetailKnown = note.knowns;
                            this.tableDetailQues = note.questions;
                        }
                    });
                }
            });
            this.assessmentModel = 1;
       }            
    }

    postNote(enter : string){
               
        let objPost : any = {
            caseId : 1,
            examId : this.examId,
            markedComplete : this.markComplete,
            noteType : 1,
            noteMessage : this.textData,
            createdDate : "",
            noteData : {
                conductedBy : this.conductedBy,
                method : this.methodModel,
                requestType: this.requestType.toString()
            }
        }
        
        if(this.type == 'Shoe'){
            objPost.itemType = 'shoe';
        }
        else{
            objPost.itemType = 'tire';
        }

        if(this.startDateError == false){
            if(this.startDate.year != '' || this.startDate.month != '' || this.startDate.date != ''){
                objPost.createdDate = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.date + 'T' + this.startDate.hours + ":" + this.startDate.mins +":" +this.startDate.secs + this.startDate.zone;
            }
        }

        if(this.path == 'view'){
            objPost.id = this.id;
        }

       
        if(enter == 'save'){
            this.note.createNote(objPost).subscribe(res => {
                this.location.back();
                window.scrollTo(0,0);
            });            
        }
        else if (enter == 'another'){
            this.note.createNote(objPost).subscribe(res => {
                if(this.type == 'Shoe'){
                    this.router.navigate(['./notes/shoe/new',this.examId]);
                    window.location.reload();
                }
                else{
                    this.router.navigate(['./notes/tire/new',this.examId]);
                    window.location.reload();
                }
                
            });
        }
        else if(enter == 'ktype'){
            this.note.createNote(objPost).subscribe(res => {
                if(this.type == 'Shoe'){
                    this.router.navigate(['./notes/shoe/kdetails/new',res.caseId,this.examId,res.id]);
                    window.scrollTo(0,0);
                }
                else{
                    this.router.navigate(['./notes/tire/kdetails/new',res.caseId,this.examId,res.id]);
                    window.scrollTo(0,0);
                }
                
            });
        }
        else if(enter == 'qtype'){
           this.note.createNote(objPost).subscribe(res => {
                this.router.navigate(['./notes/qdetails/new',res.caseId,this.examId,res.id]);
                window.scrollTo(0,0);
            }); 
        }

    } 

    onEnterData(){
        //console.log(this.requestType);
    } 

    test(){
        //console.log(this.requestType);
    } 

}