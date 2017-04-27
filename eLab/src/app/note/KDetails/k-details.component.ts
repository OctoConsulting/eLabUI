import {Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

@Component({
    selector : 'k-details',
    templateUrl : './k-details.page.html',
    styleUrls : ['./k-details.component.css']
})
export class KDetailsPage implements OnInit{
    path : 'view' | 'new' = 'new';
    type : 'shoe' | 'tire' = 'tire';
    whichDetails : 'kDetails'; 

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
    constructor(private router: Router, private route: ActivatedRoute, private location: Location){

    }

    ngOnInit(){
        this.determinePath();
                    
            this.Ktype = [
                {value : 0 ,label : "Select Option"},
                {value : 1, label : "Original Footwear"},
                {value : 2, label : "Footwear Test Impression"},
                {value : 3, label : "Photo/Print Out"},
                {value : 4, label : "Disc"},
                {value : 5, label : "Digital Image"},
                {value : 6, label : "Other"}
            ];

            if(this.type == 'shoe'){
                this.Kstyle = [
                    {value : 0, label : "Select Option"},
                    {value : 1, label : "Sandal"},
                    {value : 2, label : "Shoe"},
                    {value : 3, label : "Boot"}
                ];
            }

            if(this.type == 'tire'){
                this.PovType = [
                    {value : 0, label : "Select Option"},
                    {value : 1, label : "Driver Front"},
                    {value : 2, label : "Passenger Front"},
                    {value : 3, label : "Driver Rear"},
                    {value : 4, label : "Passanger Rear"},
                    {value : 5, label : "Spare"},
                    {value : 6, label : "Unknown"}
                ]
            }            
        }

    determinePath(){
        if (/\/view/.test(this.router.url)) {
            this.path = 'view';
        }

        if (/\/shoe/.test(this.router.url)){
            this.type = 'shoe';
        }
    }

    onSave(){
        this.location.back();
        window.scrollTo(0,0);
    }

    onCancel(){
        this.location.back();
        window.scrollTo(0,0);
    }
}