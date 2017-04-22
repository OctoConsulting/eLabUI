import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import * as moment from 'moment-timezone';
import * as $ from 'jquery';
import { Location } from '@angular/common';

@Component({
    selector : 'fbi-note',
    templateUrl : './fbi-note.page.html',
    styleUrls : ['./fbi-note.component.css']
})
export class FBINotePage implements OnInit{
    path : 'view' | 'new' = 'new';
    type : 'shoe' | 'tire' = 'tire';

    assessmentModel = '';
    assessmentOptions = [];

    conductedBy = '';
    conductedOptions = [];

    startDate = { date: 0, month: 0, year: 0, hours: 0, mins: 0, zone: '' };
    startDateError: boolean = false;

    requestType = '';
    requestOptions = [];

    methodModel = '';
    methodOptions = [];
    
    constructor( private router: Router, private route: ActivatedRoute, private location: Location){

    }

    ngOnInit(){
        this.determinePath();
        this.determineType();

        this.assessmentModel = 'default';
        this.assessmentOptions = [
            {value : 'default', label : 'Select Option'},
            {value : 'Initial Assessment', label : 'Initial Assessment'}
        ];

        this.conductedBy = 'default';
        this.conductedOptions =  [
            { label : "Select Option", value : "default"},
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

        this.requestType = 'Footwear Comparison';
        this.requestOptions = [
            {label : 'Footwear Comparison', value : 'Footwear Comparison'},
            {label : 'Footwear make/model determination',value : 'Footwear make/model determination'},
            {label : 'Footwear size determination', value : 'Footwear size determination'},
            {label : 'Other', value : 'Other'}
        ];

        this.methodModel = 'default';
        this.methodOptions = [
            {label : "Select Option", value : "default"},
            {label : "QDU Procedures for Conducting Shoe and Tire Tread Examinations", value : "QDU Procedures for Conducting Shoe and Tire Tread Examinations"},
            {label : "QDU Procedures for Conducting a Footwear Database Search", value : "QDU Procedures for Conducting a Footwear Database Search"}            
        ]
    }

    determinePath() {
        if (/\/view/.test(this.router.url)) {
            this.path = 'view';
        }
    }

    determineType(){
        if (/\/shoe/.test(this.router.url)) {
            this.type = 'shoe';
        }
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

    

}