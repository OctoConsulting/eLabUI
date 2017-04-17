import {Component,OnInit} from '@angular/core';

@Component({
    selector : 'note-table',
    templateUrl : './note-table.template.html',
    styleUrls : ['./note-table.component.css']
})
export class NoteTable implements OnInit{
    
    noteDetails;
    constructor(){

    }

    ngOnInit(){
        this.noteDetails = [
            {
                type : "Initial Assessment",
                name : "Name of Initial Assessment",
                subtype : [
                    {
                        type : "Shoe Type",
                        name : "Shoe Assessment"
                        
                    },
                    {
                        type: "Tire Type",
                        name: "Tire Assessment"
                    }
                ]
            }
        ]
    }

    

}