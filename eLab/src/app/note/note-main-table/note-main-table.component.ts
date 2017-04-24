import {Component,OnInit,Input} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector : 'note-main-table',
    templateUrl : './note-main-table.template.html',
    styleUrls : ['./note-main-table.component.css'] 
})
export class NoteMainTable implements OnInit{

    @Input() type;
    tableContent = [];
    dropDownFlag : boolean = false;
    
    constructor(private router: Router, private route: ActivatedRoute){

    }

    ngOnInit(){
        this.tableContent = [
            {
                type : "Known",
                desc : "Description provided for known"
            },
            {
                type : "Question",
                desc : "Describing the item selected for exam"
            },
            {
                type : "Question",
                desc : "Describing the item selected for exam"
            }
        ]
    }

    dropDown(){
        this.dropDownFlag = !this.dropDownFlag;
    }

    onKDetail(){
        this.dropDownFlag = false;
        if(this.type == 'shoe'){
            this.router.navigate(['./notes/kdetails/shoe/new']);
        }
        else{
            this.router.navigate(['./notes/kdetails/tire/new']);
        }
    }

    onQDetail(){
        this.dropDownFlag = false;
        this.router.navigate(['./notes/qdetails/new']);
    }
    
}