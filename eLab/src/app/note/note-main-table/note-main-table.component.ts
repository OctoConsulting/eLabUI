import {Component,OnInit} from '@angular/core';


@Component({
    selector : 'note-main-table',
    templateUrl : './note-main-table.template.html',
    styleUrls : ['./note-main-table.component.css'] 
})
export class NoteMainTable implements OnInit{

    tableContent = [];
    dropDownFlag : boolean = false;
    constructor(){

    }

    ngOnInit(){
        
    }

    dropDown(){
        this.dropDownFlag = !this.dropDownFlag;
    }

    onKDetail(){
        this.dropDownFlag = false;
    }

    onQDetail(){
        this.dropDownFlag = false;
    }
}