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
    constructor(private router: Router, private route: ActivatedRoute, private location: Location){

    }

    ngOnInit(){

    }
}
