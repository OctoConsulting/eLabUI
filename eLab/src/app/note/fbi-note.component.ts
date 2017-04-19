import {Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import * as moment from 'moment-timezone';
import * as $ from 'jquery';
import {Location} from '@angular/common';


@Component({
    selector : 'fbi-note',
    templateUrl : './fbi-note.page.html',
    styleUrls: ['./fbi-note.component.css']
})
export class FBINoteComponent implements OnInit {

    noteType : 'Shoe' | 'Tire' = 'Shoe';
    path : 'new' | 'edit' = 'edit';
    mode : 'view' | 'edit' = 'edit';

    conductedBy : string = '';
    conductedByOptions = [];

    requestType : string = '';
    requestTypeOptions = [];

    methodops : string = '';
    methodOptions = [];

    startDate = { date: 0, month: 0, year: 0, hours: 0, mins: 0, zone: '' };
    startDateError: boolean = false;

    textData = "";
    constructor(private router: Router, private route: ActivatedRoute, private location: Location){

    }
    

    ngOnInit(){
        this.determinePath();

        this.conductedBy = 'Barb McCullen';
        this.conductedByOptions = [
            { label: "Juliette Fitzsimmons", value: "Juliette Fitzsimmons" },
            { label: "Marcus Stanton", value: "Marcus Stanton" },
            { label: "Tim Miller", value: "Tim Miller" },
            { label: "Barb McCullen", value: "Barb McCullen" }
        ];

        var now = moment();

        this.startDate = {
            date: now._d.getDate(),
            month: now._d.getMonth() + 1,
            year: now._d.getFullYear(),
            hours: now._d.getHours(),
            mins: now._d.getMinutes(),
            zone: moment().format('Z')
        }

        this.requestType = "Footwear Comparison";
        this.requestTypeOptions = [
            {label : "Footwear Comparison", value : "Footwear Comparison"},
            {label : "Footwear make/model determination", value : "Footwear make/model determination"},
            {label : "Footwear size determination", value : "Footwear size determination"},
            {label : "Other", value : "Other"}
        ];

        this.methodops = "QDU Procedures for  Conducting Shoe Examination";
        this.methodOptions = [
            {label : "QDU Procedures for Conducting Shoe Examination", value : "QDU Procedures for  Conducting Shoe Examination"},
            {label : "QDU Procedures for Conducting a Footwear Database Search", value : "QDU Procedures for Conducting a Footwear Database Search" }
        ];
    }

    determinePath(){
        if (/\/tire/.test(this.router.url)) {
            this.noteType = 'Tire';
        }

        if (/\/new/.test(this.router.url)) {
            this.path = 'new';
        }
        if(/\/view/.test(this.router.url)) {
            this.mode = 'view';
        }
        
    }

    OnMultiChange(event){
        console.log(event);
    }

    validateDate() {
        
        if (!moment(this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.date + 'T' + this.startDate.hours + ":" + this.startDate.mins + this.startDate.zone, "YYYY-MM-DDTHH:mmZ").isValid()) {
            this.startDateError = true;
        }
        else {
            this.startDateError = false;
        }

    }

    onEdit(){
        this.mode = 'edit';
        window.scrollTo(0, 0); 
    }

    OnSave(){
        console.log(this.textData);
        console.log("onSave");
        this.validateDate();

        if(this.startDateError === false){
            this.location.back();
        }
    }

}
