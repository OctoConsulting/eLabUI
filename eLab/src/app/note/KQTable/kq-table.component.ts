import {Component,OnInit} from '@angular/core';

@Component({
    selector : 'kq-table',
    templateUrl : './kq-table.template.html',
    styleUrls : ['./kq-table.component.css']
})
export class KQTable implements OnInit{

    tableContent = [];
    flag : boolean = false;
    constructor(){

    }

    ngOnInit(){
        this.tableContent = [
            {
                type : "Known",
                desc : "Known description"
            },
            {
                type : "Question",
                desc : "Question description"
            },
            {
                type : "Question",
                desc : "Question description"
            }     
        ]
    }

    createKnown(){
        console.log("Known clicked");
    }

    createQuestion(){
        console.log("Question clikced");
    }

    checkFlag(){
        this.flag = !this.flag;
        return this.flag;
    }
}