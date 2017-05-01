import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import * as $ from 'jquery';
import { Location } from '@angular/common';

@Component({
    selector : 'q-details',
    templateUrl : './qdetails.page.html',
    styleUrls : ['qdetails.component.css']
})

export class QDetailsPage implements OnInit{
	path: 'view' | 'new' = 'new';
    whichDetails : 'qDetails';

	QtypeModel: number = 0;
	Qtype = [];
	
    constructor(private router: Router, private route: ActivatedRoute, private location: Location){

    }

    ngOnInit(){
    	this.Qtype = [
    		{value: 0, label: 'Select Option'}
    	]
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
