import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector : 'fbi-note',
    templateUrl : './fbi-note.page.html',
    styleUrls : ['./fbi-note.component.css']
})
export class FBINotePage implements OnInit{
    path : 'view' | 'new' = 'new';
    type : 'shoe' | 'tire' = 'tire';
    
    constructor( private router: Router, private route: ActivatedRoute ){

    }

    ngOnInit(){
        this.determinePath();
        this.determineType();
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

}