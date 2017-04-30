import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import * as moment from 'moment-timezone';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import { FbiNotesService } from '../api-kit/notes/fbi-notes.service';

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

    startDate = { date: 0, month: 0, year: 0, hours: 0, mins: 0, zone: '' };
    startDateError: boolean = false;

    requestType = [24,25];
    requestOptions = [];

    methodModel = 0;
    methodOptions = [];
    id : number;
    textData : any;

    constructor( private router: Router, private route: ActivatedRoute, private location: Location, private note : FbiNotesService){

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
            //console.log(this.id);
        });
        var now = moment();


        this.startDate = {
            date: now._d.getDate(),
            month: now._d.getMonth() + 1,
            year: now._d.getFullYear(),
            hours: now._d.getHours(),
            mins: now._d.getMinutes(),
            zone: moment().format('Z')
        }        
        
        this.populateForm();
        this.getNoteDetails();
    }
    change(){
        console.log(this.requestType);
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
        if (!moment(this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.date + 'T' + this.startDate.hours + ":" + this.startDate.mins + this.startDate.zone, "YYYY-MM-DDTHH:mmZ").isValid()) {
            this.startDateError = true;
        }
        else {
            this.startDateError = false;
        }

    }

    onSave(){
        this.validateDate();
        if(this.startDateError === false){
            this.location.back();
            window.scrollTo(0,0);
        }
    }

    onCancel(){
        this.location.back();
        window.scrollTo(0,0);
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
                console.log(res);
                this.conductedBy = res.noteData.conductedBy;
                this.startDate.date = moment(res.createdDate).format("DD");
                this.startDate.month = moment(res.createdDate).format("MM");
                this.startDate.year = moment(res.createdDate).format("YYYY");
                this.methodModel = res.noteData.method;
                this.textData = res.noteMessage;
            });
       }
       this.assessmentModel = 1; 
             
    }
}