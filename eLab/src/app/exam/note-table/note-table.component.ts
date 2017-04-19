import {Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector : 'note-table',
    templateUrl : './note-table.template.html',
    styleUrls : ['./note-table.component.css']
})
export class NoteTable implements OnInit{
    
    noteDetails;
    flag : boolean = true;

    constructor(private router: Router, private route: ActivatedRoute){

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

    createShoe(){
        this.router.navigate(['./notes/shoe/new']);
        window.scrollTo(0,0);
    }
    
    createTire(){
        this.router.navigate(['./notes/tire/new']);
        window.scrollTo(0,0);
    }

    checkFlag(){
        this.flag = !this.flag;
        return this.flag;
    }

}